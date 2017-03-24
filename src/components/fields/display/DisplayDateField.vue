<template>
  <p v-if="value">{{ value }}</p>
</template>

<script>
  /*
   * This is the output of a date field.
   * 
   * @TODO: How do we set up preferred date display?
   */

  export default {
    name: 'display-date-field',
    props: {
      value: {
        type: String,
        required: false
      }
    }
  }
</script>