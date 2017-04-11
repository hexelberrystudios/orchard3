import assign from '../utils/assign'
import addTimestamps from '../utils/add-timestamps'
import isntDesignDoc from '../utils/isnt-design-doc'

/**
 * Update multiple objects to the local database.
 *
 * @param  {PouchDB}         {REQUIRED} db                Reference to PouchDB
 * @param  {Function|Object} {REQUIRED} changedProperties Changed properties or function that alters passed doc
 * @param  {String}          {OPTIONAL} prefix            Optional id prefix
 * @return {Promise}
 */
function updateAll (db, changedProperties, prefix) {
  let docs
  const type = typeof changedProperties,
    options = {
      include_docs: true
    }

  if (type !== 'object' && type !== 'function') {
    return Promise.reject(new Error('Must provide object or function'))
  }

  if (prefix) {
    options.startkey = prefix
    options.endkey = prefix + '\uffff'
  }

  return db.allDocs(options)
    .then(function (res) {
      docs = res.rows
        .filter(isntDesignDoc)
        .map(function (row) {
          return row.doc
        })

      docs.forEach(addTimestamps)

      if (type === 'function') {
        docs.forEach(changedProperties)
        return docs
      }

      return docs.map(function (doc) {
        assign(doc, changedProperties, { _id: doc._id, _rev: doc._rev })
        return doc
      })
    })
    .then(function (result) {
      return result
    })
    .then(db.bulkDocs.bind(db))
    .then(function (results) {
      return results.map(function (result, i) {
        docs[i]._rev = result.rev
        return docs[i]
      })
    })
}

export default updateAll
