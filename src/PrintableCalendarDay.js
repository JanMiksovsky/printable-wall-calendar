import * as symbols from '../node_modules/elix/src/symbols.js';
import * as template from '../node_modules/elix/src/template.js';
import CalendarDay from '../node_modules/elix/src/CalendarDay.js';


class PrintableCalendarDay extends CalendarDay {

  get [symbols.template]() {
    const result = super[symbols.template];
    const styleTemplate = template.html`
      <style>
        :host {
          padding: 0.15em;
        }

        :host(.today) {
          color: inherit;
          font-weight: inherit;
        }

        :host(.weekend) {
          color: var(--weekend-day-color);
        }
      </style>
    `;
    result.content.appendChild(styleTemplate.content);
    return result;
  }

}


export default PrintableCalendarDay;
customElements.define('printable-calendar-day', PrintableCalendarDay);
