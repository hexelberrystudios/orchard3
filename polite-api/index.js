import add from './lib/add'
import clear from './lib/clear'
import findAll from './lib/find-all'
import find from './lib/find'
import removeAll from './lib/remove-all'
import remove from './lib/remove'
import update from './lib/update'

/**
 * This is a thin wrapper over the PouchDB API to automatically
 * handle id and timestamps.
 */
const pleaseInit = function () {
  var api = {
    pleaseAdd: add,
    pleaseClear: clear,
    pleaseFindAll: findAll,
    pleaseFind: find,
    pleaseRemoveAll: removeAll,
    pleaseRemove: remove,
    pleaseUpdate: update
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
