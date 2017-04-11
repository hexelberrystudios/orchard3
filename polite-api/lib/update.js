import updateOne from './helpers/update-one'
import updateMany from './helpers/update-many'

/**
 * Updates existing object.
 * 
 * @param  {String|Object}   idOrObject   id or object with `._id` property
 * @param  {Object|Function} [change]     Changed properties or function
 *                                        that changes existing object
 * @param  {String}        {OPTIONAL} prefix      Optional id prefix
 * @return {Promise}
 */
function update (objectsOrIds, change, prefix) {
  const db = this

  if (typeof objectsOrIds !== 'object' && !change) {
    return Promise.reject(
      new Error('Must provide change')
    )
  }

  return Array.isArray(objectsOrIds)
    ? updateMany(db, objectsOrIds, change, prefix)
    : updateOne(db, objectsOrIds, change, prefix)
}