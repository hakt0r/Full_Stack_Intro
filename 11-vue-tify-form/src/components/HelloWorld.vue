
<template>

  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="maxName"
            label="First name"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="maxName"
            label="Last name"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="password"
            ref="password"
            :rules="[...passwordRules,matchPasswords]"
            label="Password"
            type="password"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="password_repeat"
            ref="password_repeat"
            :rules="[...passwordRules,matchPasswordsRepeat]"
            label="Password"
            type="password"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn color="primary" elevation="2" :disabled="!valid">
        Register
      </v-btn>
      <v-btn color="primary" elevation="2" @click="toggleTheme">
      </v-btn>
    </v-container>
  </v-form>

</template>


<script>
  const maxName = 20;
  export default {
    name: 'HelloWorld',
    data: () => {
      return {
        valid: false,
        firstname: '',
        lastname: '',
        password: '',
        password_repeat: '',
        maxName,
        nameRules: [
          v => !!v || 'Name is required',
          v => v.length <= maxName || 'Name must be less than 10 characters',
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules: [
          v => !! v || 'Password is required',
          v => v.length >= 10  || `At least 10 Characters (you have ${v.length})`,
          v => v.length <= 100 || `At most 100 Characters (you have ${v.length})`,
          v => /[0-9]/.test(v) || 'Must contain numbers',
          v => /[a-z]/.test(v) || 'Must contain lowercase letters',
          v => /[A-Z]/.test(v) || 'Must contain uppercase letters',
          v => /[!@#$%^&*()_,./|]/.test(v) || 'Must contain special characters'
        ]
    }},
    methods: {
      toggleTheme(){
        this.$vuetify.theme.dark = ! this.$vuetify.theme.dark
        if ( this.$vuetify.theme.dark ){
          localStorage.setItem('dark-theme','true');
        } else {
          localStorage.removeItem('dark-theme');
        }
      },
      matchPasswords(){
        if ( ! this.$refs.password_repeat ) return true;
        if ( this.password === this.password_repeat ){
          this.$refs.password_repeat.valid = true;
          this.$refs.password_repeat.errorBucket = [];
          return true; 
        } else {
          this.$refs.password_repeat.valid = false;
          this.$refs.password_repeat.errorBucket = ['Passwords must match!!!!'];
          return 'Passwords must match!!!!';
        }
      },
      matchPasswordsRepeat(){
        if ( ! this.$refs.password ) return true;
        if ( this.password === this.password_repeat ){
          this.$refs.password.valid = true;
          this.$refs.password.errorBucket = [];
          return true; 
        } else {
          this.$refs.password.valid = false;
          this.$refs.password.errorBucket = ['Passwords must match!!!!'];
          return 'Passwords must match!!!!';
        }
      }
    }
  }
</script>
