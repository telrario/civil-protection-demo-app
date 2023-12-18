<template>
  <v-card :loading="loading">
    <v-card-title>{{ user.name }} | {{ user.email }}</v-card-title>
    <v-card-text>
      {{ response }}
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn text @click="fetch">Fetch</v-btn>
      <v-btn text @click="logout">Logout</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import {UserInterface, useSessionStore} from "@/store/session";

const user: UserInterface = useSessionStore().user;
</script>

<script lang="ts">
import axios from "axios";
import {getXSRFToken, HTTP_CODE_UNAUTHENTICATED} from "@/router";
import {useSessionStore} from "@/store/session";

export default {
  data(){
    return {
      response: null,
      loading: false,
    }
  },
  methods: {
    async fetch(){
      try{
        this.loading = true;
        const response = await axios.get('user/profile-information');

        this.response = response.data;
      }
      catch (ex){
        if(ex.response.status === HTTP_CODE_UNAUTHENTICATED){
          await getXSRFToken();

          this.$router.push('login');
        }
      }
      finally {
        this.loading = false;
      }
    },

    async logout() {
      try{
        await axios.post('logout');
        await getXSRFToken();

        useSessionStore().delete();

        this.$router.push('login');
      }
      catch (error){
        console.error('logout error', error);
      }
    },
  }
}
</script>

<style scoped>

</style>
