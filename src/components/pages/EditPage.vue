<template>
  <div>
    <app-header></app-header>
    <h1 class="hxb-u-pdl-1">Time to edit a...</h1>
    <object-list :objects="objects" :is-indented="isIndented"></object-list>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppHeader from '../AppHeader.vue'
  import AppFooter from '../AppFooter.vue'
  import ObjectList from '../ObjectList.vue'
  
  export default {
    name: 'edit-page',
    data: function () {
      return {
        objects: [
          {
            label: 'Template',
            link: '/app/edit-template'
          },
          {
            label: 'Bundle',
            link: '/app/edit-bundle'
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

