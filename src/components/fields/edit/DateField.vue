<template>
  <div class="hxb-form-field">
    <label :for="id"
           class="hxb-u-display-block">{{ label }}</label>
    <input :id="id"
           type="date"
           :name="id"
           class="hxb-input-field hxb-u-border hxb-gray-border-color"
           placeholder="yyyy-mm-dd"
           :value="value"
           @input="update" />
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  /*
   * This is a date field.
   * 
   * @TODO: Add datepicker.
   *
   * @param {STRING} {REQUIRED} id          The id and name of this date field.
   * @param {STRING} {REQUIRED} label       The label for this date field.
   */

  export default {
    name: 'date-field',
    methods: {
      update (e) {
        // tell action in form vuex module to update its form field with the following key/value pair
        this.$store.dispatch('form/updateField', {
          name: this.id,
          value: e.target.value
        })
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
    // define the props that can be passed in, to differentiate local variables versus arguments I guess
    props: {
      id: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      }
    }
  }
</script>