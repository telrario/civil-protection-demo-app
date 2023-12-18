<template>
  <router-view />
</template>

<script lang="ts" setup>
import {getXSRFToken} from "@/router";

getXSRFToken();

</script>
