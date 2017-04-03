<template>
  <form v-on:submit="login" name="login" method="post" action="/app/login" class="hxb-form">
    <text-field id="username" label="username" type="text" placeholder="username"></text-field>
    <text-field id="password" label="password" type="password" placeholder="password"></text-field>
    <submit-button text="Login"></submit-button>
    <router-link to="/app/register" exact>or Register</router-link>
  </form>
</template>

<script>
  import DB from '../db.js'
  import TextField from './fields/edit/TextField.vue'
  import SubmitButton from './SubmitButton.vue'
  
  export default {
    name: 'login-form',
    created () {
      this.$store.dispatch('form/resetForm')
    },
    methods: {
      login: function (e) {
        let self = this,
          username = self.$store.state.form.fields.username,
          password = self.$store.state.form.fields.password;
        e.preventDefault();

        // @TODO: ajax call to login, where the server will return the user's db url
        // for us to sync with
        self.$router.push('/app/home');
      }
    },
    components: {
      TextField,
      SubmitButton
    }
  }
</script>