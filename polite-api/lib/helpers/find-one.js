import toId from '../utils/to-id'

/**
 * Returns the object matching the given id or object.
 *
 * @param  {PouchDB}       {REQUIRED} db         Reference to PouchDB
 * @param  {String|Object} {REQUIRED} idOrObject An array of ids or objects
 * @param  {String}        {OPTIONAL} prefix     optional id prefix
 * @return {Promise}
 */
function findOne (db, idOrObject, prefix) {
  let id = toId(idOrObject)

  // add prefix if it's not included in the id already
  if (prefix && id.substr(0, prefix.length) !== prefix) {
    id = prefix + id
  }

  return db.get(id)
    .catch(function (error) {
      let missing

      if (error.status === 404) {
        missing = new Error('Object with id "' + id + '" is missing')
        missing.name = 'Not found'
        missing.status = 404
        throw missing
      } else {
        throw error
      }
    })
}

export default findOne
