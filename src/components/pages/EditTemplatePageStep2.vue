<template>
  <div>
    <app-header></app-header>
    <h1 class="hxb-u-pdl-1">You're editing your {{ template.templateName }} template:</h1>
    <div class="hxb-u-pd-1">
      <form v-on:submit="deleteTemplate" name="delete_template" method="DELETE" :action="'/app/template/' + template._id">
        <input type="hidden" name="templateId" :value="template._id" />
        <submit-button text="Delete"></submit-button>
      </form>
    </div>
    <form v-on:submit="editTemplate" name="edit-template" method="POST" action="/app/edit-template" class="hxb-form">
      <text-field id="name" label="Name"></text-field>
      <template v-for="(field, index) in fields">
        <field-card :fieldIndex="index" :removeField="removeField" v-if="field.active"></field-card>
      </template>
      <add-item-button></add-item-button>
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
  import FieldCard from '../fields/FieldCard.vue'
  import AddItemButton from '../AddItemButton.vue'
  import TextField from '../fields/edit/TextField.vue'
  import SubmitButton from '../SubmitButton.vue'
  import DB from '../../db/db'
  
  export default {
    name: 'edit-template-page-2',
    created () {
      this.$store.dispatch('form/resetForm')
      this.$store.dispatch('fields/resetFields')
    },
    mounted: function () {
      this.loadForm()
    },
    computed: {
      ...mapGetters({
        template: 'templates/getActiveTemplate',
        fields: 'fields/getFields'
      })
    },
    methods: {
      loadForm: function () {
        let i,
          field
        const fields = this.template.fields
        
        this.$store.dispatch('form/updateField', {
          name: 'name',
          value: this.template.templateName
        })
        
        console.log(this.template)
        for (i = 0; i < fields.length; i++) {
          field = fields[i]
          
          field.name = 'field_' + i
          this.$store.dispatch('form/updateField', {
            name: 'fieldLabel_' + i,
            value: field.fieldLabel
          })
          this.$store.dispatch('form/updateField', {
            name: 'fieldType_' + i,
            value: field.fieldType
          })
          this.$store.dispatch('form/updateField', {
            name: 'showInPreview_' + i,
            value: field.showInPreview
          })
          
          if (i !== 0) {
            this.$store.dispatch('fields/addField')
          }
        }
        
        console.log(this.$store.state.form.fields)
      },
      editTemplate: function (e) {
        let name,
          field,
          idx,
          db;
        let fields = [];
        let form = this.$store.state.form.fields;
        let self = this;

        e.preventDefault();
        // iterate through fields
        for (field in form) {
          console.log(field);
          // let's make sure we only check the properties of the current object
          if (form.hasOwnProperty(field)) {
            // most fields end in _n, so get the index
            idx = Number(field.charAt(field.length - 1));

            // check for NaN
            if (idx === idx) {
              if (!fields[idx]) {
                fields[idx] = {};
              }
              // if idx is a number, extract _n to get the field name and add it to
              // the fields array
              fields[idx][field.substr(0, field.length - 2)] = form[field];
            } else {
              name = form[field];
            }
          }
        }
        
        self.template.templateName = name;
        self.template.fields = fields;
        
        db = DB.get()
        db.pleaseUpdate(self.template)
          .then(function (resp) {
            console.log(resp);
            // redirect to the home page when finished
            self.$router.push('/app/home');
          }).catch(function (error) {
            console.log(error)
          });
      },
      removeField: function (fieldIndex) {
        console.log('Calling removeField in EditTemplatePage on index ' + fieldIndex);
        this.$store.dispatch('fields/removeField', fieldIndex);
      },
      deleteTemplate: function (e) {
        let db;
        let self = this;
        
        e.preventDefault();
        
        db = DB.get()
        db.pleaseRemove(self.template._id)
          .then(function (resp) {
            console.log(resp);
            // redirect to the home page when finished
            self.$router.push('/app/home');
          }).catch(function (error) {
            console.log(error)
          })
      }
    },
    components: {
      AppHeader,
      AppFooter,
      FieldCard,
      AddItemButton,
      TextField,
      SubmitButton
    }
  }
</script>

<style scoped>
  .hxb-form-field > .hxb-button {
    margin-left: calc(5.5rem + 2%);
  }
</style>