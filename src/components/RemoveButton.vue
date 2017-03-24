<template>
  <button type="button" class="hxb-remove-button" @click="remove">&#120;</button>
</template>

<script>
  export default {
    name: 'remove-button',
    props: {
      remove: {
        type: Function,
        required: true
      }
    }
  }
</script>