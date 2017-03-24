<template>
  <div class="hxb-form-field">
    <input :id="id"
           type="checkbox"
           class="hxb-checkbox"
           :name="id"
           :checked="value"
           @change="update" />
    <label :for="id" class="hxb-checkbox-label">
      {{ label }}
    </label>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  
  export default {
    name: 'checkbox-field',
    methods: {
      update (e) {
        // tell action in form vuex module to update its form field with the following key/value pair
        this.$store.dispatch('form/updateField', {
          name: this.id,
          value: e.target.checked
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