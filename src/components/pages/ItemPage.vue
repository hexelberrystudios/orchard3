<template>
  <div>
    <app-header></app-header>
    <article class="hxb-u-pd-1">
      <div>
        <router-link :to="editItemPath + itemId" class="hxb-u-float-r">Edit</router-link>
        <form v-on:submit="deleteItem" name="delete_item" method="DELETE" :action="'/app/item/' + itemId">
          <input type="hidden" name="itemId" :value="itemId" />
          <submit-button text="Delete"></submit-button>
        </form>
      </div>
      <template v-for="field in item.fields">
        <p><strong>{{ field.fieldLabel }}</strong></p>
        <display-field-morpher :field="field"></display-field-morpher>
      </template>
    </article>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import AppFooter from '../AppFooter.vue'
  import AppHeader from '../AppHeader.vue'
  import DisplayFieldMorpher from '../fields/display/DisplayFieldMorpher.vue'
  import SubmitButton from '../SubmitButton.vue'
  import DB from '../../db/db'
  
  export default {
    name: 'item-page',
    data: function () {
      return {
        editItemPath: '/app/item/edit/',
        itemId: this.$route.params.itemId
      }
    },
    mounted: function () {
      this.$store.dispatch('items/getItem', this.$route.params.itemId)
    },
    computed: {
      ...mapGetters({
        item: 'items/getActiveItem'
      })
    },
    methods: {
      deleteItem: function (e) {
        let db;
        let self = this;
        
        e.preventDefault();
        
        db = DB.get();
        db.pleaseRemove(self.item._id)
          .then(function (resp) {
            console.log(resp);
            // redirect to the home page when finished
            self.$router.push('/app/home');
          }).catch(function (error) {
            console.log(error)
          });
      }
    },
    components: {
      AppFooter,
      AppHeader,
      DisplayFieldMorpher,
      SubmitButton
    }
  }
</script>
