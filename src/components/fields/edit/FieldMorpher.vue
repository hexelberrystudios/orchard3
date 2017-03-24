<template>
  <component v-bind:is="field.fieldType" v-bind:id="fieldId" v-bind:label="field.fieldLabel"></component>
</template>

<script>
  import TextField from './TextField.vue'
  import TextAreaField from './TextAreaField.vue'
  import DateField from './DateField.vue'
  import TimeField from './TimeField.vue'
  import CompletableField from './CompletableField.vue'
  import TimeSinceField from './TimeSinceField.vue'
  
  /**
   * This component will morph into the given field.
   * NOTE: Remember to update this component with all relevant properties from possible fields,
   * so the properties can be properly bound.
   */
  export default {
    name: 'field-morpher',
    props: {
      field: {
        type: Object,
        required: true
      },
      fieldId: {
        type: String,
        required: true
      }
    },
    components: {
      TextField,
      TextAreaField,
      DateField,
      TimeField,
      CompletableField,
      TimeSinceField
    }
  }
</script>