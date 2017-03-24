<template>
  <ul class="hxb-choice-list">
    <li v-for="choice in choices" class="hxb-choice-list-item">
      <router-link :to="choice.link" class="hxb-choice-list-item__link">
        <span>{{ choice.label }}</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
  /*
   * A choice list is one that lists a list of options to choose from.
   * Used as an alternative for a drop down.
   * choices {ARRAY} - [{ link: 'string', label: 'string' }, ...]
   */
  export default {
    name: 'choice-list',
    props: {
      choices: {
        type: Array,
        required: true
      }
    }
  }
</script>