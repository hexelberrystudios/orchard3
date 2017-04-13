const fieldListModule = {
  // namespace this module so that it doesn't collide with other store behavior
  namespaced: true, // -> getters['fields/*']
  // default values
  // fields are represented as an array of empty objects since the data gets managed in the
  // form store, but we need to keep track of an ordered list of objects we can remove in the future
  state: { fields: [{ active: true }] },
  getters: {
    getFields: function (state) {
      return state.fields;
    }
  },
  // directly update the store
  mutations: {
    // add field to list
    ADD_FIELD: (state) => {
      state.fields.push({ active: true });
    },
    // remove field from list
    REMOVE_FIELD: (state, fieldIndex) => {
      if (typeof fieldIndex !== 'undefined') {
        console.log('Removing index ' + fieldIndex);
        console.log(state.fields);
        state.fields[fieldIndex].active = false;
        console.log(state.fields);
      } else {
        throw new Error('fieldIndex undefined in fields/removeField');
      }
    },
    RESET_FIELDS: (state) => {
      state.fields = [{ active: true }];
    }
  },
  // update the store event handler
  actions: {
    addField ({ commit }) { commit('ADD_FIELD') },
    removeField ({ commit }, fieldIndex) { commit('REMOVE_FIELD', fieldIndex) },
    resetFields ({ commit }) { commit('RESET_FIELDS') }
  }
}

export default fieldListModule
