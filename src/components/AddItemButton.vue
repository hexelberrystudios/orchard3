<template>
  <button type="button" class="hxb-field-card hxb-add-item-button" @click="addField">
    <span class="hxb-add-item-button__icon">+</span>
  </button>
</template>

<script>
  import { mapActions } from 'vuex'
  
  export default {
    name: 'add-item-button',
    methods: {
      ...mapActions({
        addField: 'fields/addField'
      })
    }
  }
</script>