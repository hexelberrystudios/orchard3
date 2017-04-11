import findOne from './helpers/find-one'
import findMany from './helpers/find-many'

/**
 * finds existing object in local database
 *
 * @param  {String|Object} {REQUIRED} idOrObject  Id of object or object with `._id` property
 * 
 * @param  {String}        {OPTIONAL} prefix      Optional id prefix
 * @return {Promise}
 */
function find (objectsOrIds, prefix) {
  const db = this

  return Array.isArray(objectsOrIds)
    ? findMany(db, objectsOrIds, prefix)
    : findOne(db, objectsOrIds, prefix)
}

export default find
