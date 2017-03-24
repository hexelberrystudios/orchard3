<template>
  <div>
    <app-header></app-header>
    <h1 class="hxb-u-pdl-1">Time to make a new...</h1>
    <object-list :objects="objects" :is-indented="isIndented"></object-list>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppHeader from '../AppHeader.vue'
  import AppFooter from '../AppFooter.vue'
  import ObjectList from '../ObjectList.vue'
  
  export default {
    name: 'new-page',
    data: function () {
      return {
        objects: [
          {
            label: 'Item',
            link: '/app/new-item'
          },
          {
            label: 'Template',
            link: '/app/new-template'
          },
          {
            label: 'Bundle',
            link: '/app/new-bundle'
          }
        ],
        isIndented: true
      }
    },
    components: {
      AppHeader,
      AppFooter,
      ObjectList
    }
  }
</script>

