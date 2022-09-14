<template>
  <div>
    <img
      v-if="loading"
      src="@/assets/img/spinner.svg"
      alt=""
      width="100"
      height="100"
      class="d-inline-block"
    />
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style></style>
