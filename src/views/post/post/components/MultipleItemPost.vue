<template>
  <div id="contentPost">
    <vs-card v-for="(item, index) in ListPost" :key="item.id">
      <div class="flex">
        <vs-avatar size="40px" :src="item.user.image_url.path" :alt="item.user.name" />
        <div>
          <h6 class="mt-2">{{ item.user.name }}</h6>
          <small>{{ item.create_date | timeBefore}}</small>
        </div>
      </div>
      <vs-divider />
      <div id="contentPostArea" v-if="item.content" >
        {{ item.content }}
      </div>
      <div id="mediaPostArea" v-if="item.pictures.length > 0">
        <media-post :data="item.pictures" />
      </div>
    </vs-card>
  </div>
</template>

<script>
  import MediaPost from "./MediaPost";
  export default {
    data () {
      return {
        loadPostSettings: {
          page_number: 1,
          item_per_page: 4,
          type_id: 1
        }
      }
    },
    components: {
      MediaPost
    },
    computed: {
      ListPost () {
        return this.$store.getters['post/getPosts'];
      }
    },
    created() {
      this.$store.dispatch('post/getListPost', this.loadPostSettings)
    }
  }
</script>

<style lang="scss" scoped>

</style>
