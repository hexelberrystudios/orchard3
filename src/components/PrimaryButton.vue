<template>
  <button type="button" class="hxb-button">{{ text }}</button>
</template>

<script>
  // @TODO: Update Vue.js documentation to make it clearer what the minimum requirements are for a single file component
  export default {
    // define the html tag that will be used to invoke this component (<primary-button text="exampleText"></primary-button>)
    name: 'primary-button',
    props: {
      text: {
        type: String,
        required: true
      }
    }
  }
</script>