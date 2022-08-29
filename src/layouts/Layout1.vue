<template>
  <div>
    <Sidebar />
    <div class="padding">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
export default {
  components: { Sidebar },
};
</script>

<style>
.padding {
  padding-left: 300px;
}

@media screen and (max-width: 768px) {
  .padding {
    padding-left: 0;
  }
}
</style>
