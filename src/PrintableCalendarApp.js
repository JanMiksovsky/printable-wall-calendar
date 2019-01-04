import './PrintableCalendarYear.js';
import './LocaleSelector.js';
import { html } from '../node_modules/elix/src/template.js';
import { merge } from '../node_modules/elix/src/updates.js';
import * as calendar from '../node_modules/elix/src/calendar.js';
import * as symbols from '../node_modules/elix/src/symbols.js';
import CalendarElementMixin from '../node_modules/elix/src/CalendarElementMixin.js';
import ReactiveElement from '../node_modules/elix/src/ReactiveElement.js';


const Base =
  CalendarElementMixin(
    ReactiveElement
  );


class PrintableCalendarApp extends Base {

  componentDidMount() {
    if (super.componentDidMount) { super.componentDidMount(); }
    this.$.localeSelector.addEventListener('change', event => {
      this.setState({
        locale: event.detail.value
      });
    });
  }

  get defaultState() {
    return Object.assign({}, super.defaultState, {
      date: calendar.today()
    });
  }

  get [symbols.template]() {
    return html`
      <style>
        :host {
          display: grid;
          grid-column-gap: 2em;
          grid-row-gap: 2em;
          grid-template-columns: 1fr auto auto 1fr;
        }

        #intro {
          grid-column: 2;
          width: 380px;
        }

        #mapContainer {
          background: white;
          box-sizing: border-box;
          position: relative;
          width: 345px;
        }

        #map {
          display: block;
          opacity: 0.75;
          width: 100%;
        }

        #instructions {
          padding: 1em;
          position: absolute;
          bottom: 0;
          background: white;
        }

        printable-calendar-year {
          grid-column: 2 / span 2;
        }

        #footnote {
          grid-column: 2 / span 2;
          text-align: center;
        }

        .stickyNote {
          background: #fffacd;
          box-sizing: border-box;
          display: inline-block;
          padding: 1.5em;
        }
        .stickyNote > :first-child {
          margin-top: 0;
        }
        .stickyNote > :last-child {
          margin-bottom: 0;
        }

        .stickyNote li {
          margin-bottom: 0.5em;
          margin-left: -1.5em; /* Unindent */
        }

        @media screen {
          :host {
            margin: 2em;
          }

          printable-calendar-year {
            background: white;
            padding: 2em;
          }

          .shadowBox {
            box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
          }
        }

        @media print {
          .noPrint {
            display: none;
          }
        }
      </style>

      <div id="intro" class="stickyNote noPrint shadowBox">
        <h2>Printable Wall Calendar</h2>
        <p>
          Put this calendar on your office or conference room wall, and you'll
          always be able to quickly answer two common scheduling questions:
        </p>
        <ol>
          <li>
            <b>On which day of the week will a given date fall?</b>
          </li>
          <li>
            <b>What's the date of a given day of the week?</b>
          </li>
        </ol>
        <p>
          Paper can be faster than gadgets!
        </p>
      </div class="stickyNote">

      <div id="mapContainer" class="noPrint shadowBox">
        <img id="map" src="resources/map.jpg">
        <div id="instructions">
          Pick your preferred language/location:
          <locale-selector id="localeSelector"></locale-selector>
        </div>
      </div>

      <printable-calendar-year id="calendarNext" class="shadowBox"></printable-calendar-year>
      <printable-calendar-year id="calendarCurrent" class="shadowBox"></printable-calendar-year>

      <div id="footnote">
        <div class="stickyNote noPrint shadowBox">
          ©2013–19 Jan Miksovsky<br>
          <a id="sourceLink" href="https://github.com/JanMiksovsky/printable-wall-calendar">View the source code</a>
        </div>
      </div>
    `;
  }

  get updates() {
    const { date, locale } = this.state;
    const nextDate = new Date(date.getTime());
    nextDate.setFullYear(date.getFullYear() + 1);
    return merge(super.updates, {
      $: {
        calendarCurrent: {
          date,
          locale
        },
        calendarNext: {
          date: nextDate,
          locale
        }
      }
    });
  }

}


export default PrintableCalendarApp;
customElements.define('printable-calendar-app', PrintableCalendarApp);
