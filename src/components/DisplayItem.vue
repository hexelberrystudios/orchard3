<template>
  <section class="hxb-object-list-item">
    <router-link :to="itemPath + item.id" class="hxb-object-list-item__link">
      <template v-for="field in item.fields" v-if="field.showInPreview === 'yes'">
        <display-field-morpher :field="field"></display-field-morpher>
      </template>
    </router-link>
  </section>
</template>

<script>
  import DisplayFieldMorpher from './fields/display/DisplayFieldMorpher.vue'
  
  export default {
    name: 'display-item',
    data: function () {
      return {
        itemPath: '/app/item/'
      }
    },
    components: {
      DisplayFieldMorpher
    },
    props: {
      item: {
        type: Object,
        required: true
      }
    }
  }
</script>