import add from './lib/add'

/**
 * This is a thin wrapper over the PouchDB API to automatically
 * handle id and timestamps.
 */
const pleaseInit = function () {
  var api = {
    pleaseAdd: add
  }
  
  return api
}

/*

Example:
var pleaseAPI = { pleaseFindAll : function() { ... } };

var PouchDB = require('pouchdb').plugin(pleaseAPI);

var db = new PouchDB('foobar');
db.pleaseFindAll(); // returns all
*/

if (typeof window !== 'undefined' && window.PouchDB) {
  window.PouchDB.plugin(exports);
}

export default pleaseInit
