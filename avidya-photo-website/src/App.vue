<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
/* Global Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #fafafa;
}

#app {
  min-height: 100vh;
}

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c7b299;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #b5a081;
}

/* Focus styles for accessibility */
button:focus,
input:focus,
select:focus,
textarea:focus,
a:focus {
  outline: 2px solid #c7b299;
  outline-offset: 2px;
}

/* Smooth transitions */
* {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Remove transition on transform and opacity for better performance */
*:not(.fade-enter-active):not(.fade-leave-active) {
  transition-property: background-color, border-color, color, fill, stroke, box-shadow;
}
</style>
