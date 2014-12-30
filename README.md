This repository holds the source for the Printable Wall Calendar app at
http://janmiksovsky.github.io/printable-wall-calendar.

This app mostly just glues together two web components (which can be found in
the /components folder) that do the heavy lifting:
* basic-calendar-month. A culture-sensitive month calendar.
* The Globalize.js library (https://github.com/jquery/globalize). This is wrapped in a component called basic-culture-selector.
