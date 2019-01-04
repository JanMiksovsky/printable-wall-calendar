import './PrintableCalendarMonth.js';
import './PrintableCalendarDayNamesHeader.js';
import { merge } from '../node_modules/elix/src/updates.js';
import * as calendar from '../node_modules/elix/src/calendar.js';
import * as symbols from '../node_modules/elix/src/symbols.js';
import * as template from '../node_modules/elix/src/template.js';
import CalendarElementMixin from '../node_modules/elix/src/CalendarElementMixin.js';
import ReactiveElement from '../node_modules/elix/src/ReactiveElement.js';


const Base =
  CalendarElementMixin(
    ReactiveElement
  );


class PrintableCalendarYear extends Base {

  get defaultState() {
    return Object.assign(super.defaultState, {
      date: calendar.today()
    });
  }

  get [symbols.template]() {
    return template.html`
      <style>
        :host {
          display: inline-grid;
          font-size: 21px;
          grid-gap: 1em;
          grid-template-columns: repeat(3, auto);
          --weekend-day-color: gray;
        }

        #year {
          color: #990000;
          font-size: 36px;
          grid-column: 1 / span 3;
          margin: 0;
          text-align: left;
        }

        printable-calendar-day-names-header {
          font-size: 14px;
        }
      </style>

      <h1 id="year"></h1>

      <printable-calendar-day-names-header id="header1" format="short"></printable-calendar-day-names-header>
      <printable-calendar-day-names-header id="header2" format="short"></printable-calendar-day-names-header>
      <printable-calendar-day-names-header id="header3" format="short"></printable-calendar-day-names-header>
      
      <printable-calendar-month id="month0"></printable-calendar-month>
      <printable-calendar-month id="month1"></printable-calendar-month>
      <printable-calendar-month id="month2"></printable-calendar-month>
      <printable-calendar-month id="month3"></printable-calendar-month>
      <printable-calendar-month id="month4"></printable-calendar-month>
      <printable-calendar-month id="month5"></printable-calendar-month>
      <printable-calendar-month id="month6"></printable-calendar-month>
      <printable-calendar-month id="month7"></printable-calendar-month>
      <printable-calendar-month id="month8"></printable-calendar-month>
      <printable-calendar-month id="month9"></printable-calendar-month>
      <printable-calendar-month id="month10"></printable-calendar-month>
      <printable-calendar-month id="month11"></printable-calendar-month>
    `;
  }

  get updates() {
    const { date, locale } = this.state;
    const elementUpdates = {
      header1: {
        locale
      },
      header2: {
        locale
      },
      header3: {
        locale
      },
      year: {
        textContent: date.getFullYear()
      }
    };
    for (let i = 0; i <= 11; i++) {
      const monthId = `month${i}`;
      const referenceDate = new Date(date.getTime());
      referenceDate.setMonth(i);
      elementUpdates[monthId] = {
        date: referenceDate,
        locale
      };
    }
    return merge(super.updates, {
      $: elementUpdates
    });
  }

}


export default PrintableCalendarYear;
customElements.define('printable-calendar-year', PrintableCalendarYear);
