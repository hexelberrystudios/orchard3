<template>
  <div>
    <h1>Style Guide</h1>
    <article>
      <header>
        <h2 id="colors">Colors</h2>
      </header>
      <section>
        <ul id="color-cards">
          <li aria-label="The black color display, followed by the CSS classes that enable the use of the black color">
            <span style="background-color: var(--black-color)"></span>
            <span>var(--black-color)</span>
          </li>
          <li aria-label="The dark color display, followed by the CSS classes that enable the use of the dark color">
            <span style="background-color: var(--dark-color)"></span>
            <span>var(--dark-color)</span>
          </li>
          <li aria-label="The medium color display, followed by the CSS classes that enable the use of the medium color">
            <span style="background-color: var(--med-color)"></span>
            <span>var(--med-color)</span>
          </li>
          <li aria-label="The gray color display, followed by the CSS classes that enable the use of the gray color">
            <span style="background-color: var(--gray-color)"></span>
            <span>var(--gray-color)</span>
          </li>
          <li aria-label="The light color display, followed by the CSS classes that enable the use of the light color">
            <span style="background-color: var(--light-color)"></span>
            <span>var(--light-color)</span>
          </li>
          <li aria-label="The very light color display, followed by the CSS classes that enable the use of the very light color">
            <span style="background-color: var(--v-light-color)"></span>
            <span>var(--v-light-color)</span>
          </li>
        </ul>
      </section>
    </article>
    <article>
      <header>
        <h2 id="typography">Typography</h2>
      </header>
      <section>
        <p>Using default system fonts.</p>
      </section>
    </article>
    <article>
      <header>
        <h2 id="buttons">Buttons</h2>
      </header>
      <section id="button_doc">
        <div>
          <primary-button text="Button"></primary-button>
        </div>
        <code id="button" class="component-js"></code>
      </section>
      <section id="submit_button_doc">
        <div>
          <submit-button text="Submit"></submit-button>
        </div>
        <code id="submit_button" class="component-js"></code>
      </section>
    </article>
    <article>
      <header>
        <h2 id="forms">Forms</h2>
      </header>
      <section id="text_field_doc">
        <text-field id="example_text_field" label="Text Field" placeholder="Placeholder"></text-field>
        <p>
          The type argument allows you to use the text field template for emails, passwords, telephone numbers, etc.
        </p>
        <code id="text_field" class="component-js"></code>
      </section>
      <section id="textarea_doc">
        <textarea-field id="example_textarea_field" label="Text Area" placeholder="Placeholder"></textarea-field>
        <code id="textarea_field" class="component-js"></code>
      </section>
      <section id="checkbox_doc">
        <checkbox-field id="example_checkbox" label="Checkbox" value="Checkbox"></checkbox-field>
        <code id="checkbox_field" class="component-js"></code>
      </section>
      <section id="radio_button_doc">
        <radio-button-field id="example_radio_button" label="Radio Buttons" :options="radioButtonOptions"></radio-button-field>
        <code id="radio_button_field" class="component-js"></code>
      </section>
    </article>
    <article>
      <header>
        <h2 id="dropdown_field">Dropdowns</h2>
      </header>
      <section id="dropdown_field_doc">
        <dropdown-field id="example_dropdown" label="Dropdown" :options="dropdownOptions"></dropdown-field>
        <code id="dropdown_field" class="component-js"></code>
      </section>
    </article>
    <article>
      <header>
        <h2 id="lists">Lists</h2>
      </header>
      <section id="object_list_doc">
        <div>
          <object-list :objects="objectListObjects"></object-list>
        </div>
        <code id="object_list" class="component-js"></code>
      </section>
      <section id="choice_list_doc">
        <div>
          <choice-list :choices="objectListObjects"></choice-list>
        </div>
        <code id="choice_list" class="component-js"></code>
      </section>
    </article>
    <article>
      <header>
        <h2 id="cards">Cards</h2>
      </header>
      <section id="field_card_doc">
        <div class="hxb-form">
          <field-card :fieldIndex="index" :removeField="removeField"></field-card>
        </div>
        <code id="field_card" class="component-js"></code>
      </section>
      <section id="add_item_button_doc">
        <div class="hxb-form">
          <add-item-button></add-item-button>
        </div>
        <code id="add_item_button" class="component-js"></code>
      </section>
    </article>
    <!-- TODO: Checklist -->
    <!-- TODO: Dropdowns -->
    <!-- TODO: Header -->
    <!-- TODO: Footer -->
    <!-- TODO: Date -->
    <!-- TODO: Time -->
    <!-- TODO: Note -->
    <!-- TODO: Time spent -->
    <!-- TODO: Links -->
    <!-- TODO: Images -->
    <!-- TODO: Date repeat -->
    <!-- TODO: Cards -->
    <article>
      <header>
        <h2 id=""></h2>
      </header>
      <section id="">
        <div>
          
        </div>
        <code id="" class="component-js"></code>
      </section>
    </article>
    <style>
      main {
        width: 80%;
        margin: 0 auto;
        font-size: 1rem;
      }
      
      code {
        display: block;
        margin: 1rem;
        padding: 0.5rem;
        background-color: var(--light-color);
        border: 0.1rem solid var(--gray-color);
        border-radius: 0.25rem;
      }

      section > div {
        margin: 1rem;
      }
      
      #color-cards {
        list-style: none;
      }
      
      #color-cards > li {
        display: inline-block;
        text-align: center;
        width: 25%;
        margin-bottom: 1rem;
        vertical-align: top;
        min-height: 10rem;
        border-radius: 0.25rem;
        border: 0.1rem solid var(--dark-color);
      }
      
      #color-cards > li > * {
        display: block;
        line-height: 1.5;
        padding-top: 0.1rem;
      }
      
      #color-cards > li > span:first-child {
        padding: 4rem;
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
      }
    </style>
  </div>
</template>

<script>
  import CheckboxField from '../fields/edit/CheckboxField.vue'
  import ChoiceList from '../ChoiceList.vue'
  import DropdownField from '../fields/edit/DropdownField.vue'
  import ObjectList from '../ObjectList.vue'
  import PrimaryButton from '../PrimaryButton.vue'
  import RadioButtonField from '../fields/edit/RadioButtonField.vue'
  import SubmitButton from '../SubmitButton.vue'
  import TextAreaField from '../fields/edit/TextAreaField.vue'
  import TextField from '../fields/edit/TextField.vue'
  import FieldCard from '../fields/FieldCard.vue'
  import AddItemButton from '../AddItemButton.vue'

  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function (e) {
      var i;
      var componentSource = document.querySelectorAll('.component-js');
      var components = {
        button: '<primary-button text="Button"></primary-button>',
        submit_button: '<submit-button text="Submit"></submit-button>',
        text_field: '<text-field id="example_text_field" label="Text Field" placeholder="Placeholder"></text-field>',
        textarea_field: '<textarea-field id="example_textarea_field" label="Text Area" placeholder="Placeholder"></textarea-field>',
        checkbox_field: '<checkbox-field id="example_checkbox" label="Checkbox" value="Checkbox"></checkbox-field>',
        radio_button_field: '<radio-button-field id="example_radio_button" label="Radio Buttons" options="radioButtonOptions"></radio-button-field>',
        dropdown_field: '<dropdown-field id="example_dropdown" label="Dropdown" options="dropdownOptions"></dropdown-field>',
        object_list: '<object-list objects="objectListObjects"></object-list>',
        choice_list: '<choice-list choices="choiceListObjects"></choice-list>',
        field_card: '<field-card :fieldIndex="index" :removeField="removeField"></field-card>',
        add_item_button: '<add-item-button></add-item-button>'
      };
      for (i = 0; i < componentSource.length; i++) {
        componentSource[i].innerText = components[componentSource[i].getAttribute('id')];
      }
    });
  }

  export default {
    name: 'styleguide',
    data: function () {
      var opt1 = Object.create(null);
      opt1.label = 'Option 1';
      opt1.value = 'option_1';
      var opt2 = Object.create(null);
      opt2.label = 'Option 2';
      opt2.value = 'option_2';

      return {
        index: 0,
        removeField: function () {},
        radioButtonOptions: [opt1, opt2],
        dropdownOptions: [{ value: '', label: 'Select a value' }, { value: 'one', label: 'A value' }, { value: 'two', label: 'Another value' }],
        objectListObjects: [{ link: '#', label: 'One thing' }, { link: '#', label: 'Another thing' }, { link: '#', label: 'The best thing' }]
      };
    },
    components: {
      CheckboxField,
      ChoiceList,
      DropdownField,
      ObjectList,
      PrimaryButton,
      RadioButtonField,
      SubmitButton,
      TextAreaField,
      TextField,
      FieldCard,
      AddItemButton
    }
  }
</script>