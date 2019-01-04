import './PrintableCalendarMonth.js';
import '../node_modules/elix/src/CalendarDayNamesHeader.js';
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
          display: inline-block;
        }
      </style>

      <h1 id="year"></h1>
      <div id="monthGrid">
        <div class="monthsRow" id="daysOfWeekHeader">
          <div>
            <elix-calendar-day-names-header format="short"></elix-calendar-day-names-header>
          </div>
          <div>
            <elix-calendar-day-names-header format="short"></elix-calendar-day-names-header>
          </div>
          <div>
            <elix-calendar-day-names-header format="short"></elix-calendar-day-names-header>
          </div>
        </div>
        <div class="monthsRow">
          <printable-calendar-month id="month0"></printable-calendar-month>
          <printable-calendar-month id="month1"></printable-calendar-month>
          <printable-calendar-month id="month2"></printable-calendar-month>
        </div>
        <div class="monthsRow">
          <printable-calendar-month id="month3"></printable-calendar-month>
          <printable-calendar-month id="month4"></printable-calendar-month>
          <printable-calendar-month id="month5"></printable-calendar-month>
        </div>
        <div class="monthsRow">
          <printable-calendar-month id="month6"></printable-calendar-month>
          <printable-calendar-month id="month7"></printable-calendar-month>
          <printable-calendar-month id="month8"></printable-calendar-month>
        </div>
        <div class="monthsRow">
          <printable-calendar-month id="month9"></printable-calendar-month>
          <printable-calendar-month id="month10"></printable-calendar-month>
          <printable-calendar-month id="month11"></printable-calendar-month>
        </div>
      </div>
    `;
  }

  get updates() {
    const { date } = this.state;
    const monthsUpdates = {};
    for (let i = 0; i <= 11; i++) {
      const monthId = `month${i}`;
      const referenceDate = new Date(date.getTime());
      referenceDate.setMonth(i);
      monthsUpdates[monthId] = {
        date: referenceDate
      };
    }
    return merge(super.updates, {
      $: monthsUpdates
    });
  }

}


export default PrintableCalendarYear;
customElements.define('printable-calendar-year', PrintableCalendarYear);
