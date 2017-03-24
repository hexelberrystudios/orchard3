<template>
  <p v-if="value">{{ value }}</p>
</template>

<script>
  /*
   * This is the output of a text field.
   */

  export default {
    name: 'display-text-field',
    props: {
      value: {
        type: String,
        required: false
      }
    }
  }
</script>