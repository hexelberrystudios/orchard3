<template>
  <p v-if="value">{{ value }}</p>
</template>

<script>
  /*
   * This is the output of a text area field.
   */

  export default {
    name: 'display-textarea-field',
    props: {
      value: {
        type: String,
        required: false
      }
    }
  }
</script>