import utils from '../utils.js'

const itemModule = {
  // namespace this module so that it doesn't collide with other store behavior
  namespaced: true, // -> getters['items/*']
  // default values
  state: { items: [{}], activeItem: {} },
  getters: {
    getItems: state => state.items,
    getActiveItem: state => state.activeItem
  },
  // directly update the store
  mutations: {
    // set item list
    ITEM_LIST: (state, items) => {
      state.items = items
    },
    // set current item
    ACTIVE_ITEM: (state, item) => {
      console.log(item)
      state.activeItem = item
    }
  },
  // update the store event handler
  actions: {
    getItems: ({ commit, state }) => {
      const findAllItems = function (resolve, reject) {
        // look through the DB for all the items
        hoodie.store.findAll()
          .then((docs) => {
            console.log(docs)
            return docs.filter(doc => doc.isItem) // only include docs where isItem is true
          })
          .then((itemDocs) => {
            console.log('ITEMS FOUND:')
            console.log(itemDocs)
            // update the store with the list of available items
            commit('ITEM_LIST', itemDocs)
            resolve(itemDocs)
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      }
              
      return utils.runHoodieFn(commit, state, findAllItems)
    },
    getItem: ({ commit, state }, id) => {
      const findItem = function (resolve, reject) {
        // look through the DB for all the items
        hoodie.store.find(id)
          .then((itemDoc) => {
            // update the store with the list of available items
            commit('ACTIVE_ITEM', itemDoc)
            resolve(itemDoc)
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      }
      
      return utils.runHoodieFn(commit, state, findItem)
    },
    getToDoItems: ({ commit, state }) => {
      const findAllToDoItems = function (resolve, reject) {
        // look through the DB for all the items
        hoodie.store.findAll()
          .then((docs) => {
            console.log(docs)
            return docs.filter(function (doc) {
              const completableFields = doc.fields.filter(function (field) {
                return field.fieldType === 'CompletableField'
              })
              
              return doc.isItem && completableFields.length
            }) // only include docs where isItem is true
          })
          .then((itemDocs) => {
            console.log('TO DO ITEMS FOUND:')
            console.log(itemDocs)
            
            // @TODO: Refactor into configurable system
            // Sort items date desc
            itemDocs.sort(function (itemA, itemB) {
              let dateA,
                dateB,
                date,
                time
                  
              // get all relevant fields that have been filled out
              const dateFieldsA = itemA.fields.filter(function (field) {
                return field.fieldType === 'DateField' && field.value
              })
              const dateFieldsB = itemB.fields.filter(function (field) {
                return field.fieldType === 'DateField' && field.value
              })
              const timeFieldsA = itemA.fields.filter(function (field) {
                return field.fieldType === 'TimeField' && field.value
              })
              const timeFieldsB = itemB.fields.filter(function (field) {
                return field.fieldType === 'TimeField' && field.value
              })
              
              // we're going to sort by the first date and time field we find,
              // because how else are we going to do that
              if (dateFieldsA.length || timeFieldsA.length) {
                dateA = new Date()
              }
              if (dateFieldsA.length) {
                date = dateFieldsA[0].value.split('-')
                dateA.setYear(date[0])
                dateA.setMonth(date[1])
                dateA.setDate(date[2])
              }
              if (timeFieldsA.length) {
                time = timeFieldsA[0].value.split(':')
                dateA.setHours(time[0])
                dateA.setMinutes(time[1])
              }
              
              if (dateFieldsB.length || timeFieldsB.length) {
                dateB = new Date()
              }
              if (dateFieldsB.length) {
                date = dateFieldsB[0].value.split('-')
                dateB.setYear(date[0])
                dateB.setMonth(date[1])
                dateB.setDate(date[2])
              }
              if (timeFieldsB.length) {
                time = timeFieldsB[0].value.split(':')
                dateB.setHours(time[0])
                dateB.setMinutes(time[1])
              }
              
              // sort by date desc
              if (dateA && dateB) {
                return dateB.getTime() - dateA.getTime()
              } else if (dateA) {
                // A < B
                return -1
              } else if (dateB) {
                // A > B
                return 1
              } else {
                // Neither have dates, so they're equal
                return 0
              }
            })
            
            // update the store with the list of available items
            commit('ITEM_LIST', itemDocs)
            resolve(itemDocs)
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      }
              
      return utils.runHoodieFn(commit, state, findAllToDoItems)
    },
    setItem: ({ commit, state }, item) => {
      commit('ACTIVE_ITEM', item)
    }
  }
}

export default itemModule
