<template>
  <checkbox-field :id="id" :label="label"></checkbox-field>
</template>

<script>
  import CheckboxField from './CheckboxField.vue'
  
  export default {
    name: 'completable-field',
    props: {
      id: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      }
    },
    components: {
      CheckboxField
    }
  }
</script>

