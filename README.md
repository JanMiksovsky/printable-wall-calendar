This repository holds the source for the Printable Wall Calendar app at
http://janmiksovsky.github.io/printable-wall-calendar.

This app mostly just glues together two web components (which can be found in
the /components folder) that do the heavy lifting:
* quetzal-calendar-month-with-headings. A culture-sensitive month calendar.
* The Globalize.js library (https://github.com/jquery/globalize). For ease of use,
  this is wrapped in a component called globalize-culture.
