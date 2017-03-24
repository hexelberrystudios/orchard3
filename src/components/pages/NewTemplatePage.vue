<template>
  <div>
    <app-header></app-header>
    <h1 class="hxb-u-pdl-1">Time to make a new template!</h1>
    <form v-on:submit="addTemplate" name="new-template" method="POST" action="/app/new-template" class="hxb-form">
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
  
  export default {
    name: 'new-template-page',
    created () {
      this.$store.dispatch('form/resetForm')
    },
    computed: {
      ...mapGetters({
        fields: 'fields/getFields'
      })
    },
    methods: {
      addTemplate: function (e) {
        let name,
          field,
          idx;
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

        hoodie.ready.then(function () {
          if (hoodie.account.isSignedIn()) {
            hoodie.store.add({
              templateName: name,
              fields: fields
            });
            // redirect to the home page when finished
            self.$router.push('/app/home');
          } else {
            throw new Error('User is not currently signed in.');
          }
        });
      },
      removeField: function (fieldIndex) {
        console.log('Calling removeField in NewItemPage on index ' + fieldIndex);
        this.$store.dispatch('fields/removeField', fieldIndex);
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