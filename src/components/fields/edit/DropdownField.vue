<template>
  <div class="hxb-form-field">
    <label :for="id"
           class="hxb-u-display-block">{{ label }}</label>
    <select :id="id" class="hxb-dropdown" @change="update" v-model="value">
      <option v-for="option in options" :value="option.value">{{ option.label }}</option>
    </select>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  
  /*
   * This is a text field. It can be of type text, email, password, etc.
   *
   * @param {STRING} {REQUIRED} id       The id and name of this text field.
   * @param {STRING} {REQUIRED} label    The label for this text field.
   * @param {ARRAY}  {REQUIRED} options  An array containing the list of options, given in the format [{ label: 'string', value: 'string' }, ...]
   */
  export default {
    name: 'dropdown-field',
    methods: {
      update (e) {
        // tell action in form vuex module to update its form field with the following key/value pair
        this.$store.dispatch('form/updateField', {
          name: this.id,
          value: e.target.value
        })
      },
      isSelected (value) {
        return this.value === value;
      }
    },
    computed: {
      // get the latest value of this form field from the vuex store
      ...mapState({
        value: function (state) {
          return state.form.fields[this.id] || '';
        }
      })
    },
    props: {
      id: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      options: {
        type: Array,
        required: true
      }
    }
  }
</script>