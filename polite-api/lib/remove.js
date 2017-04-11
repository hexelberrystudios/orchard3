import updateOne from './helpers/update-one'
import updateMany from './helpers/update-many'
import markAsDeleted from './utils/mark-as-deleted'

/**
 * Removes existing object
 *
 * @param  {PouchDB}         {REQUIRED} db           Reference to PouchDB
 * @param  {Array}           {REQUIRED} idsOrObjects An array of ids or objects
 * @param  {Object|Function} {OPTIONAL} change       Change properties or function that
 *                                                   changes existing object
 * @param  {String}          {OPTIONAL} prefix       Optional id prefix
 * @return {Promise}
 */
function remove (state, objectsOrIds, change, prefix) {
  const db = this

  return Array.isArray(objectsOrIds)
    ? updateMany(db, objectsOrIds.map(markAsDeleted.bind(null, change)), null, prefix)
    : updateOne(db, markAsDeleted(change, objectsOrIds), null, prefix)
}

export default remove
