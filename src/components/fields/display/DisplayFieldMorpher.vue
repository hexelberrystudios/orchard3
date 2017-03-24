<template>
  <component v-bind:is="'Display' + field.fieldType" v-bind:value="field.value"></component>
</template>

<script>
  import DisplayTextField from './DisplayTextField.vue'
  import DisplayTextAreaField from './DisplayTextAreaField.vue'
  import DisplayDateField from './DisplayDateField.vue'
  import DisplayTimeField from './DisplayTimeField.vue'
  import DisplayCompletableField from './DisplayCompletableField.vue'
  import DisplayTimeSinceField from './DisplayTimeSinceField.vue'
  
  /**
   * This component will morph into the given field.
   * NOTE: Remember to update this component with all relevant properties from possible fields,
   * so the properties can be properly bound.
   */
  export default {
    name: 'display-field-morpher',
    props: {
      field: {
        type: Object,
        required: true
      }
    },
    components: {
      DisplayTextField,
      DisplayTextAreaField,
      DisplayDateField,
      DisplayTimeField,
      DisplayCompletableField,
      DisplayTimeSinceField
    }
  }
</script>