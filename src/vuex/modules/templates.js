import utils from '../utils.js'

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
        // look through the DB for all the templates
        hoodie.store.findAll()
          .then((docs) => {
            return docs.filter(function (doc) { return doc.templateName && !doc.isItem }) // filter out docs that have no templateName field
          })
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
      }
              
      return utils.runHoodieFn(commit, state, findAllTemplates)
    },
    getTemplate: ({ commit, state }, id) => {
      const findTemplate = function (resolve, reject) {
        // look through the DB for all the items
        hoodie.store.find(id)
          .then((templateDoc) => {
            // update the store with the list of available items
            commit('ACTIVE_TEMPLATE', templateDoc)
            resolve(templateDoc)
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      }
      
      return utils.runHoodieFn(commit, state, findTemplate)
    },
    setTemplate: ({ commit, state }, template) => {
      commit('ACTIVE_TEMPLATE', template)
    }
  }
}

export default templateModule
