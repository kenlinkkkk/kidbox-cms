<template>
  <div class="vx-row">
    <div class="vx-col w-full lg:w-1/2 m-auto">
      <post-add />
    </div>
  </div>
</template>

<script>
  import PostAdd from "./PostAdd";
  export default {
    components: {
      PostAdd
    },
    mounted () {
      this.wasSidebarOpen = this.$store.state.reduceButton
      this.$store.commit('TOGGLE_REDUCE_BUTTON', true)
    },
    beforeDestroy () {
      if (!this.wasSidebarOpen) this.$store.commit('TOGGLE_REDUCE_BUTTON', false)
    }
  }
</script>

<style scoped>

</style>
