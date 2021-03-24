<template>
  <vx-card>
    <vs-chip transparent color="primary" class="m-2">
      <vs-avatar size="30px" :src="$store.state.AppActiveUser.photoURL"/>
      {{$store.state.AppActiveUser.displayName}}
    </vs-chip >

    <vs-textarea
      auto-grow
      placeholder="Bài viết mới ...">

    </vs-textarea>

    <vs-divider />
    <div class="flex justify-center">
      <vs-button color="success" type="border" icon-pack="feather" icon="icon-image" class="m-2">Thêm ảnh</vs-button>
      <vs-button color="success" type="filled" icon-pack="feather" icon="icon-film" class="m-2">Thêm video</vs-button>
    </div>
  </vx-card>
</template>

<script>
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'
  export default {
    data () {
      return {
        postInfo: {
          image: [],
          video: [],
          content: ""
        }
      }
    },
    components: {
      VuePerfectScrollbar
    },
    computed: {
      scrollbarTag () { return this.$store.getters.scrollbarTag },
    },
    methods: {
      clickTextArea () {
        console.log("active")
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
