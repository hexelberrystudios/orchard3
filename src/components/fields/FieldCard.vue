<template>
  <div class="hxb-field-card">
    <remove-button :remove="remove"></remove-button>
    <text-field :id="fieldLabel" label="Field Label"></text-field>
    <dropdown-field :id="fieldType" label="Field Type" :options="fieldTypes"></dropdown-field>
    <radio-button-field :id="showInPreview" label="Show in preview?" :options="radioButtonOptions"></radio-button-field>
  </div>
</template>

<script>
  import RemoveButton from '../RemoveButton.vue'
  import TextField from './edit/TextField.vue'
  import DropdownField from './edit/DropdownField.vue'
  import RadioButtonField from './edit/RadioButtonField.vue'

  export default {
    name: 'field-card',
    data: function () {
      return {
        fieldLabel: 'fieldLabel_' + this.fieldIndex,
        fieldType: 'fieldType_' + this.fieldIndex,
        showInPreview: 'showInPreview_' + this.fieldIndex,
        radioButtonOptions: [
          {
            label: 'No',
            value: 'no'
          },
          {
            label: 'Yes',
            value: 'yes'
          }
        ],
        fieldTypes: [
          {
            label: '-- Select One --',
            value: ''
          },
          {
            label: 'Text Field',
            value: 'TextField'
          },
          {
            label: 'Large Text Field',
            value: 'TextAreaField'
          },
          {
            label: 'Date',
            value: 'DateField'
          },
          {
            label: 'Time',
            value: 'TimeField'
          },
          {
            label: 'Completable',
            value: 'CompletableField'
          },
          {
            label: 'Time Since',
            value: 'TimeSinceField'
          }
        ]
      };
    },
    methods: {
      remove () {
        // clean up the fields we're about to remove from the form
        this.$store.dispatch('form/removeField', {
          name: this.fieldLabel
        });
        this.$store.dispatch('form/removeField', {
          name: this.fieldType
        });
        this.$store.dispatch('form/removeField', {
          name: this.showInPreview
        });
        // tells the parent component that we've done the clean up necessary
        // to now remove this card
        console.log('Calling removeField in FieldCard on index ' + this.fieldIndex);
        this.removeField(this.fieldIndex);
      }
    },
    props: {
      fieldIndex: {
        type: Number,
        required: true
      },
      removeField: {
        type: Function,
        required: true
      }
    },
    components: {
      RemoveButton,
      TextField,
      DropdownField,
      RadioButtonField
    }
  }
</script>