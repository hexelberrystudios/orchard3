<template>
  <fieldset class="hxb-fieldset">
    <legend>{{ label }}</legend>
    <template v-for="(option, index) in options">
      <input  :id="id + '_' + index"
              type="radio"
              class="hxb-radio-button"
              :name="id"
              :checked="isChecked(option.value)"
              :value="option.value"
              @change="update" />
      <label  :for="id + '_' + index"
              class="hxb-radio-button-label">
        {{ option.label }}
      </label>
    </template>
  </fieldset>
</template>

<script>
  import { mapState } from 'vuex'
  
  /*
   * options {ARRAY} - [{ label: 'string', value: 'string' }, ...]
   */
  export default {
    name: 'radio-button-field',
    methods: {
      update (e) {
        // tell action in form vuex module to update its form field with the following key/value pair
        this.$store.dispatch('form/updateField', {
          name: this.id,
          value: e.target.value
        })
      },
      isChecked (value) {
        return this.value === value ? 'checked' : '';
      }
    },
    computed: {
      // get the latest value of this form field from the vuex store
      ...mapState({
        value: function (state) {
          return state.form.fields[this.id];
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