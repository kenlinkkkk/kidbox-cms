<template>
  <div class="vx-row">
    <div class="vx-col w-full lg:w-1/2 m-auto">
      <post-add />
      <vs-divider />
      <multiple-item-post />
    </div>
  </div>
</template>

<script>
  import PostAdd from "./PostAdd";
  import PostModule from "@/store/post/postStore.js"
  import MultipleItemPost from "./components/MultipleItemPost";

  export default {
    components: {
      PostAdd,
      MultipleItemPost
    },
    mounted () {
      this.wasSidebarOpen = this.$store.state.reduceButton
      this.$store.commit('TOGGLE_REDUCE_BUTTON', true)
    },
    created() {
      this.$store.registerModule('post', PostModule);
    },
    beforeDestroy () {
      this.$store.unregisterModule('post');
      if (!this.wasSidebarOpen) this.$store.commit('TOGGLE_REDUCE_BUTTON', false)
    }
  }
</script>

<style scoped>

</style>
