<template>
  <p v-if="value">{{ value }}</p>
</template>

<script>
  /*
   * This is the output of a time field.
   * 
   * @TODO: Right now it displays in military time. How do we setup option for preferred time display?
   */

  export default {
    name: 'display-time-field',
    props: {
      value: {
        type: String,
        required: false
      }
    }
  }
</script>