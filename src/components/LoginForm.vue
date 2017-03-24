<template>
  <form v-on:submit="register" name="login" method="post" action="/app/login" class="hxb-form">
    <text-field id="username" label="username" type="text" placeholder="username"></text-field>
    <text-field id="password" label="password" type="password" placeholder="password"></text-field>
    <submit-button text="Login"></submit-button>
    <router-link to="/app/register" exact>or Register</router-link>
  </form>
</template>

<script>
  import TextField from './fields/edit/TextField.vue'
  import SubmitButton from './SubmitButton.vue'
  
  export default {
    name: 'login-form',
    created () {
      this.$store.dispatch('form/resetForm')
    },
    methods: {
      register: function (e) {
        let self = this;
        e.preventDefault();

        // hoodie.account is not available until hoodie.ready (a promise) is resolved.
        hoodie.ready.then(function () {
          hoodie.account.ready.then(function () {
            // @TODO: Check if signing out is necessary before signing in
            hoodie.account.signUp({
              username: self.$store.state.form.fields.username,
              password: self.$store.state.form.fields.password
            }).then(function (accountProperties) {
              // returns id, username, createdAt, updatedAt
              console.log(accountProperties);
              // account created! you aren't signed in yet, though
              hoodie.account.signIn({
                username: self.$store.state.form.fields.username,
                password: self.$store.state.form.fields.password
              }).then(function (sessionProperties) {
                // returns id, username, createdAt, updatedAt,
                // and profile properties (i.e. fullname)
                console.log(sessionProperties);
                // redirect to the home page when finished
                self.$router.push('/app/home');
              });
            }).catch(function (err) {
              console.log(err);
            });
          });
        });
      }
    },
    components: {
      TextField,
      SubmitButton
    }
  }
</script>