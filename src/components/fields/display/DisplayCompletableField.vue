<template>
  <p v-if="value">Completed</p>
  <p v-else>Incomplete</p>
</template>

<script>
  /*
   * This is the output of a completable field.
   * 
   */

  export default {
    name: 'display-completable-field',
    props: {
      value: {
        type: Boolean,
        required: false
      }
    }
  }
</script>