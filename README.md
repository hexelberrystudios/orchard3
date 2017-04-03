# orchard3
Organizer tool.

Rollup was used to try and reduce the bundling overhead in weight and processing associated with Webpack and Browserify, due to its use of ES2015 modules. The current output is in IIFE.

There is a client and server config, but the only difference is the entry point, client-entry.js and server-entry.js, respectively. This is due to the fact that Vue needs to be initialized differently on the server than it does on the client.

vue-ssr.js and render.js handle the universal js logic to initialize Vue.js on the server, using the bundled application.

Free tier features:
- No account required.
- Unlimited use, but data will be lost when cache is cleared

Premium tier features:
- Password protected account
- Cloud backup
  - backup frequency is customizable
- Sync across devices
- API access

Technologies used:

- Vue
  - Vuex
  - Vue router
- Babel
- Rollup
- Express
- Node
- PouchDB
- CouchDB

Concepts used:

- Universal Javascript

Concepts in progress:

- Store hydration
- Service Workers
- Offline first
- Progressive Web App (PWA)
