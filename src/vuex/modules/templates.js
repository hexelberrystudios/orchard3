import DB from '../../db/db'

const templateModule = {
  // namespace this module so that it doesn't collide with other store behavior
  namespaced: true, // -> getters['templates/*']
  // default values
  state: { templates: [{}], activeTemplate: {} },
  getters: {
    getTemplates: state => state.templates,
    getActiveTemplate: state => state.activeTemplate
  },
  // directly update the store
  mutations: {
    // set template list
    TEMPLATE_LIST: (state, templates) => {
      state.templates = templates
    },
    // set current template
    ACTIVE_TEMPLATE: (state, template) => {
      console.log(template)
      state.activeTemplate = template
    }
  },
  // update the store event handler
  actions: {
    getTemplates: ({ commit, state }) => {
      const findAllTemplates = function (resolve, reject) {
        let db = DB.get()
        
        if (db) {
          // look through the DB for all the templates
          db.pleaseFindAll((doc) => doc.templateName && !doc.isItem)
            .then((templateDocs) => {
              console.log('done loading templates')
              console.log(templateDocs)
              // update the store with the list of available templates
              commit('TEMPLATE_LIST', templateDocs)
              resolve(templateDocs)
            })
            .catch((error) => {
              console.log(error)
              reject(error)
            })
        } else {
          commit('TEMPLATE_LIST', [])
          resolve([])
        }
      }
      
      return new Promise(findAllTemplates)
    },
    getTemplate: ({ commit, state }, id) => {
      const findTemplate = function (resolve, reject) {
        let db = DB.get()
        
        if (db) {
          // look through the DB for all the items
          db.pleaseFind(id)
            .then((templateDoc) => {
              // update the store with the list of available items
              commit('ACTIVE_TEMPLATE', templateDoc)
              resolve(templateDoc)
            })
            .catch((error) => {
              console.log(error)
              reject(error)
            })
        } else {
          commit('ACTIVE_TEMPLATE', {})
          resolve({})
        }
      }
      
      return new Promise(findTemplate)
    },
    setTemplate: ({ commit, state }, template) => {
      commit('ACTIVE_TEMPLATE', template)
    }
  }
}

export default templateModule
