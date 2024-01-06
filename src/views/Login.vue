<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-sheet width="400" class="mx-auto">
      <v-form fast-fail @submit.prevent="login" :disabled="loading">
        <v-text-field
          v-model="email"
          label="Email"
        />

        <v-text-field
          type="password"
          v-model="password"
          label="password"
        />
        <a href="#" class="text-body-2 font-weight-regular">Forgot Password?</a>

        <v-btn
          type="submit"
          color="primary"
          block
          class="mt-2"
          :disabled="loading"
        >
          Sign in
          <template #append>
            <v-progress-circular
              v-show="loading"
              indeterminate
            />
          </template>
        </v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">

</script>

<script>
import axios from "axios";
import {getXSRFToken, HTTP_CODE_SESSION_EXPIRED} from "@/router";
import {useSessionStore} from "@/store/session";
import {mapActions} from "pinia";

export default {
  data() {
    return {
      loading: false,
      email: 'telmo.riofrio@funiber.org',
      password: 'jok456pe',
    };
  },
  methods: {
    async login() {
      this.loading = true;

      let response = await axios.post('login', {
        email: this.email,
        password: this.password,
      });

      if(response.data.user){
        console.info('you are logged in', response);

        this.store(response.data.user);

        await getXSRFToken();

        this.$router.push('/profile');
      }

      this.loading = false;
    },

    ...mapActions(useSessionStore, ['store'])
  },
}
</script>

<style scoped>

</style>
