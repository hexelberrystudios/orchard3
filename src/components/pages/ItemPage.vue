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
        let self = this;
        
        e.preventDefault();
        
        hoodie.ready.then(function () {
          if (hoodie.account.isSignedIn()) {
            hoodie.store.remove(self.item.id);
            // redirect to the home page when finished
            self.$router.push('/app/home');
          } else {
            throw new Error('User is not currently signed in.');
          }
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
