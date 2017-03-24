<template>
  <div>
    <app-header></app-header>
    <article class="hxb-object-list">
      <template v-for="item in items">
        <display-item :item="item" v-if="!isCompleted(item)"></display-item>
      </template>
    </article>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import AppHeader from '../AppHeader.vue'
  import AppFooter from '../AppFooter.vue'
  import DisplayItem from '../DisplayItem.vue'
  
  const fetchInitialData = store => {
    return store.dispatch('items/getToDoItems')
  }
  
  export default {
    name: 'to-do-page',
    computed: {
      ...mapGetters({
        items: 'items/getItems'
      })
    },
    methods: {
      isCompleted: function (item) {
        let isCompleted = true
        
        // @TODO: Figure out why item.fields is not available server side
        if (!item.fields) {
          return false
        }
        
        // find all fields that render this item completable
        // (I mean, there should be only one, but I'm not going to prevent people from having more)
        const completableFields = item.fields.filter(function (field) {
          return field.fieldType === 'CompletableField' ? field : false
        })
        
        if (completableFields.length) {
          // This item is deemed completed when all completable fields are set to completed
          isCompleted = completableFields.reduce(function (currentField, field) {
            return { value: currentField.value && field.value }
          }).value
        }
        
        return isCompleted
      }
    },
    mounted () {
      fetchInitialData(this.$store)
    },
    components: {
      AppHeader,
      AppFooter,
      DisplayItem
    }
  }
</script>

