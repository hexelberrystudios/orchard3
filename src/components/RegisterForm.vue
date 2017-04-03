<template>
  <form v-on:submit="register" name="register" method="post" action="/app/register" class="hxb-form">
    <text-field id="username"
                label="username"
                type="text"
                placeholder="username"></text-field>
    <text-field id="password"
                label="password"
                type="password"
                placeholder="password"></text-field>
    <submit-button text="Register"></submit-button>
  </form>
</template>

<script>
  import TextField from './fields/edit/TextField.vue'
  import SubmitButton from './SubmitButton.vue'
  
  export default {
    name: 'register-form',
    created () {
      this.$store.dispatch('form/resetForm')
    },
    methods: {
      register: function (e) {
        let self = this,
          username = self.$store.state.form.fields.username,
          password = self.$store.state.form.fields.password;
        e.preventDefault();

        // @TODO: ajax call to register, where CouchDB url will be created, and the url
        // to sync with will be returned. Prerequisite: Authorization token for signing up for premium.
        self.$router.push('/app/home');
      }
    },
    components: {
      TextField,
      SubmitButton
    }
  }
</script>