<script setup>
import { RouterView } from 'vue-router'
import { Vue3Snackbar } from 'vue3-snackbar'
import SidebarComponent from './components/SidebarComponent.vue'
</script>

<template>
  <SidebarComponent />

  <div class="main">
    <RouterView />
  </div>

  <vue3-snackbar bottom right :duration="4000"></vue3-snackbar>
</template>
