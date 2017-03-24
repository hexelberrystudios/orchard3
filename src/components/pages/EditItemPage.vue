<template>
  <div>
    <app-header></app-header>
    <article class="hxb-u-pd-1">
      <router-link :to="itemPath + item.id">Back</router-link>
      <form v-on:submit="editItem" name="edit_item" method="POST" action="/app/edit-item" class="hxb-form">
        <template v-for="(field, index) in item.fields">
          <field-morpher :field="field" :fieldId="'field_' + index"></field-morpher>
        </template>
        <div class="hxb-form-field">
          <submit-button text="Save"></submit-button>
        </div>
      </form>
    </article>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import AppFooter from '../AppFooter.vue'
  import AppHeader from '../AppHeader.vue'
  import FieldMorpher from '../fields/edit/FieldMorpher.vue'
  import SubmitButton from '../SubmitButton.vue'
  
  export default {
    name: 'edit-item-page',
    data: function () {
      return {
        itemPath: '/app/item/',
        itemId: this.$route.params.itemId
      }
    },
    created () {
      this.$store.dispatch('form/resetForm')
    },
    mounted: function () {
      let self = this
      // load item to be edited
      this.$store.dispatch('items/getItem', this.$route.params.itemId).then(function () {
        // fill form fields with item's stored field values
        self.loadForm()
      })
    },
    computed: {
      ...mapGetters({
        item: 'items/getActiveItem'
      })
    },
    methods: {
      loadForm: function () {
        let i,
          field
        const fields = this.item.fields
        
        for (i = 0; i < fields.length; i++) {
          field = fields[i]
          if (field.hasOwnProperty('value')) {
            field.name = 'field_' + i
            this.$store.dispatch('form/updateField', field)
          }
        }
      },
      editItem: function (e) {
        let i,
          field;
        let self = this;
        let form = this.$store.state.form.fields;
        let itemFields = this.item.fields;
        
        e.preventDefault();
        console.log(form);
        for (i = 0; i < itemFields.length; i++) {
          field = form['field_' + i];
          
          // ignore fields that weren't changed  
          if (typeof field !== 'undefined') {
            itemFields[i].value = field;
          }
        }
        
        hoodie.ready.then(function () {
          if (hoodie.account.isSignedIn()) {
            hoodie.store.update(self.item);
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
      FieldMorpher,
      SubmitButton
    }
  }
</script>