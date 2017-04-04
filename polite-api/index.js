
/**
 * This is a thin wrapper over the PouchDB API to automatically
 * handle id and timestamps.
 */
const pleaseInit = function (PouchDB) {
  console.log('db:')
  console.log(this)
  console.log('PouchDB:')
  console.log(PouchDB)
  var api = {
    
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
