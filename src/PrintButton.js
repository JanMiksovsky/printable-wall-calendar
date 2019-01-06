import { html } from '../node_modules/elix/src/template.js';
import { merge } from '../node_modules/elix/src/updates.js';
import * as symbols from '../node_modules/elix/src/symbols.js';
import Button from '../node_modules/elix/src/Button.js';


class PrintButton extends Button {

  get [symbols.template]() {
    return html`
      <style>
        #inner {
          background: whitesmoke -webkit-linear-gradient(white, rgb(230, 230, 230)) repeat scroll 0% 0%;
          border-radius: 3px;
          border: 1px solid rgb(204, 204, 204);
          box-shadow: rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.05) 0px 1px 2px;
          color: rgb(51, 51, 51);
          font-family: inherit;
          font-size: inherit;
          font-style: inherit;
          font-weight: inherit;
          padding: 0.3em 0.6em;
          text-align: center;
          vertical-align: middle;
          white-space: nowrap;
        }

        #icon {
          height: 20px;
          width: 20px;
        }

        #icon {
          opacity: 0.5;
          vertical-align: middle;
        }

        #tooltip {
          background: white;
          border: 1px solid #ccc;
          box-shadow: 5px 5px 10px rgba( 0, 0, 0, 0.5 );
          box-sizing: border-box;
          display: none;
          font-size: 15px;
          margin-top: 2px;
          padding: 1em;
          position: absolute;
          right: 0;
          width: 275px;
          z-index: 1;
        }

        :host(:hover) #icon {
          opacity: 1.0;
        }

        :host(:hover) #tooltip {
          display: block;
        }
      </style>
      <button id="inner" tabindex="-1">
        <img id="icon" src="resources/printer.png">
        <span>Print</span>
      </button>
      <div id="tooltip">
        Tip: When the print dialog appears, turn <b>off</b> headers/footers,
        and turn <b>on</b> background images/colors. "Scale to Fit" and
        narrow margins may also help.
      </div>
    `;
  }

  get updates() {
    return merge(super.updates, {
      attributes: {
        tabindex: 0
      }
    });
  }

}


export default PrintButton;
customElements.define('print-button', PrintButton);
