<template>
  <div>
    <app-header></app-header>
    <h1 class="hxb-u-pdl-1 hxb-u-txt-center" v-if="!areTemplatesLoaded()">Loading...</h1>
    <h1 class="hxb-u-pdl-1" v-if="templates.length > 0">Which template would you like to edit?</h1>
    <form v-on:submit="setTemplate" name="set_template" method="POST" action="/app/edit-template-page-2" class="hxb-form" v-if="templates.length > 0">
      <dropdown-field id="template" label="Select a template" :options="templateOptions"></dropdown-field>
      <div class="hxb-form-field">
        <submit-button text="Save"></submit-button>
      </div>
    </form>
    <h1 class="hxb-u-pdl-1 hxb-u-txt-center" v-if="areTemplatesLoaded() && templates.length === 0">No templates found. Please make a template first.</h1>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import AppFooter from '../AppFooter.vue'
  import AppHeader from '../AppHeader.vue'
  import DropdownField from '../fields/edit/DropdownField.vue'
  import SubmitButton from '../SubmitButton.vue'
  
  const fetchInitialData = store => {
    return store.dispatch('templates/getTemplates')
  }
  
  export default {
    name: 'edit-template-page-1',
    prefetch: fetchInitialData,
    computed: {
      ...mapGetters({
        templates: 'templates/getTemplates'
      }),
      templateOptions: function () {
        let i,
          template
        let templates = this.templates
        let templateList = [{
          label: '-- please select one --',
          value: ''
        }]
        
        for (i = 0; i < templates.length; i++) {
          template = templates[i]
          templateList.push({
            label: template.templateName,
            value: template.id
          })
        }
        
        this.$store.dispatch('form/updateField', {
          name: 'field_0',
          value: ''
        })

        return templateList
      }
    },
    created () {
      this.$store.dispatch('form/resetForm')
    },
    mounted () {
      fetchInitialData(this.$store)
    },
    methods: {
      areTemplatesLoaded: function () {
        return Array.isArray(this.templateOptions)
      },
      setTemplate: function (e) {
        let i,
          template
        let templateId = this.$store.state.form.fields['template']
        
        e.preventDefault()
        
        for (i = 0; i < this.templates.length; i++) {
          if (this.templates[i].id === templateId) {
            template = this.templates[i]
            break
          }
        }

        this.$store.dispatch('templates/setTemplate', template)
        this.$router.push('/app/edit-template-page-2')
      }
    },
    components: {
      AppHeader,
      AppFooter,
      DropdownField,
      SubmitButton
    }
  }
</script>

<style scoped>
  .hxb-form-field > .hxb-button {
    margin-left: calc(5.5rem + 2%);
  }
</style>