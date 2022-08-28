<template>
  <div id="app">
    <SidebarVue />
    <router-view />
  </div>
</template>

<script>
import SidebarVue from './components/Sidebar.vue'

export default {
  components: { SidebarVue },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a {
  color: #6e84a3 !important;
}
</style>
