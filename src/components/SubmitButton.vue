<template>
  <button type="submit" class="hxb-button">{{ text }}</button>
</template>

<script>
  export default {
    name: 'submit-button',
    props: {
      text: {
        type: String,
        required: true
      }
    }
  }
</script>