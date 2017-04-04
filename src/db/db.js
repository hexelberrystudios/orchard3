import PouchDB from 'pouchdb'
import politeAPI from '../../polite-api/index'

let db,
  remoteDB;
  
PouchDB.plugin(politeAPI)

/**
 * PouchDB singleton.
 * Get and/or instantiate PouchDB instance.
 * If dbName is defined, a remote PouchDB instance will be created.
 * 
 * @param dbName [STRING] [OPTIONAL] The remote db to sync with.
 * 
 * @returns The local PouchDB instance on the client, null on the server.
 */
const get = function (dbName) {
  if (typeof module === 'undefined') {
    if (!db) {
      db = new PouchDB('local_db')
    }
  
    if (dbName) {
      // REQUIREMENT: We must be logged in in order for this to work
      remoteDB = new PouchDB(dbName)
      // if we wanted to maintain a live connection with the remote db, we could do the following:
      // db.sync(remoteDB, {live: true, retry: true}).on('error', console.log.bind(console));
      // some CouchDB providers do not support this though, and it can be expensive, so let's not for now.
    }
  
    return db
  } else {
    // @TODO: Figure out server side response
    return null
  }
}

/**
 * Sync the local and remote DB, if available.
 */
const remoteSync = function () {
  if (db && remoteDB) {
    db.sync(remoteDB)
  }
}

export { get, remoteSync }