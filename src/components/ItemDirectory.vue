<template>
  <article class="hxb-object-list">
    <template v-for="item in items">
      <display-item :item="item"></display-item>
    </template>
  </article>
</template>

<script>
  import { mapGetters } from 'vuex'
  import DisplayItem from './DisplayItem.vue'
  
  /**
   * Shows a list of items and bundles for the current bundle directory.
   *
   * @TODO: Replace items with data pulled from DB.
   *
   * @param {STRING} {REQUIRED} path The bundle path to display.
   */
  
  const fetchInitialData = store => {
    return store.dispatch('items/getItems')
  }
  
  export default {
    name: 'item-directory',
    computed: {
      ...mapGetters({
        items: 'items/getItems'
      })
    },
    mounted () {
      fetchInitialData(this.$store)
    },
    components: {
      DisplayItem
    },
    props: {
      path: {
        type: String,
        required: true
      }
    }
  }
</script>