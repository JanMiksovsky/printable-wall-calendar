import { merge } from '../node_modules/elix/src/updates.js'
import * as calendar from '../node_modules/elix/src/calendar.js'
import * as symbols from '../node_modules/elix/src/symbols.js';
import * as template from '../node_modules/elix/src/template.js';
import CalendarMonth from '../node_modules/elix/src/CalendarMonth.js';
import PrintableCalendarDay from './PrintableCalendarDay.js';


class PrintableCalendarMonth extends CalendarMonth {

  get defaultState() {
    return Object.assign({}, super.defaultState, {
      dayRole: PrintableCalendarDay,
      yearFormat: null // Hide year
    });
  }

  get [symbols.template]() {
    const result = super[symbols.template];
    const styleTemplate = template.html`
      <style>
        :host {
          display: inline-block;
          position: relative;
        }

        #monthYearHeader {
          color: #990000;
          font-size: 21px;
          padding: 0.15em;
          text-align: left;
        }

        :host(.sixWeekMonth) #monthYearHeader {
          position: absolute;
        }

        #weekDaysHeader {
          display: none;
        }

        #monthDays {
          font-weight: bold;
        }
      </style>
    `;
    result.content.appendChild(styleTemplate.content);
    return result;
  }

  get updates() {
    // Determine whether the month requires six weeks to display: has more
    // than 29 days, and the last day is to the left of the first day.
    const { date, locale } = this.state;
    const firstDateOfMonth = calendar.firstDateOfMonth(date);
    const lastDateOfMonth = calendar.lastDateOfMonth(date);
    const daysInMonth = lastDateOfMonth.getDate();
    const firstDayPosition = calendar.daysSinceFirstDayOfWeek(firstDateOfMonth, locale);
    const lastDayPosition = calendar.daysSinceFirstDayOfWeek(lastDateOfMonth, locale);
    const sixWeekMonth = daysInMonth > 29 && lastDayPosition < firstDayPosition;
    return merge(super.updates, {
      classes: {
        sixWeekMonth
      }
    });
  }

}


export default PrintableCalendarMonth;
customElements.define('printable-calendar-month', PrintableCalendarMonth);
