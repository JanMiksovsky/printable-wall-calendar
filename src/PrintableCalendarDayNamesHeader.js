import * as symbols from '../node_modules/elix/src/symbols.js';
import * as template from '../node_modules/elix/src/template.js';
import CalendarDayNamesHeader from '../node_modules/elix/src/CalendarDayNamesHeader.js';


class PrintableCalendarDayNamesHeader extends CalendarDayNamesHeader {

  get [symbols.template]() {
    const result = super[symbols.template];
    const styleTemplate = template.html`
      <style>
        .dayOfWeek.weekend {
          color: var(--weekend-day-color);
        }
      </style>
    `;
    result.content.appendChild(styleTemplate.content);
    return result;
  }

}


export default PrintableCalendarDayNamesHeader;
customElements.define('printable-calendar-day-names-header', PrintableCalendarDayNamesHeader);
