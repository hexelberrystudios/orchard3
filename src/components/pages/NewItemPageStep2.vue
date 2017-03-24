<template>
  <div>
    <app-header></app-header>
    <h1 class="hxb-u-pdl-1" v-if="template">Time to add a new {{ template.templateName }}!</h1>
    <form v-on:submit="addItem" name="new_item" method="POST" action="/app/new-item" class="hxb-form">
      <template v-for="(field, index) in template.fields">
        <field-morpher :field="field" :fieldId="'field_' + index"></field-morpher>
      </template>
      <div class="hxb-form-field">
        <submit-button text="Save"></submit-button>
      </div>
    </form>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import AppFooter from '../AppFooter.vue'
  import AppHeader from '../AppHeader.vue'
  import SubmitButton from '../SubmitButton.vue'
  import FieldMorpher from '../fields/edit/FieldMorpher.vue'
  
  // @TODO: Get this to work without javascript,
  // and get this to work with reloading the page

  export default {
    name: 'new-item-page-2',
    computed: {
      ...mapGetters({
        template: 'templates/getActiveTemplate'
      })
    },
    methods: {
      addItem: function (e) {
        let i,
          templateField;
        let self = this;
        let form = this.$store.state.form.fields;
        let templateFields = this.template.fields;
        let item = {
          isItem: true,
          fields: []
        }
        
        e.preventDefault();
        
        // convert the template into an item, so that all template data
        // is localized, and changes to the template will not affect items
        // unless an explicit update is made
        for (i = 0; i < templateFields.length; i++) {
          templateField = templateFields[i]
          
          item.fields.push({
            fieldLabel: templateField.fieldLabel,
            fieldType: templateField.fieldType,
            showInPreview: templateField.showInPreview,
            value: form['field_' + i]
          })
        }
        item.templateName = this.template.templateName
        
        hoodie.ready.then(function () {
          if (hoodie.account.isSignedIn()) {
            hoodie.store.add(item);
            // redirect to the home page when finished
            self.$router.push('/app/home');
          } else {
            throw new Error('User is not currently signed in.');
          }
        });
      }
    },
    components: {
      AppHeader,
      AppFooter,
      FieldMorpher,
      SubmitButton
    }
  }
</script>

<style scoped>
  .hxb-form-field > .hxb-button {
    margin-left: calc(5.5rem + 2%);
  }
</style>