<template>
  <vs-avatar :src="params.data.image_url.path" class="flex-shrink-0 mr-2" size="38px" @click="$router.push(url)"/>
</template>

<script>
export default {
  name: "CellRendererPicture",
  computed: {
    url () {
      return '/admin/child/view/' + this.params.data.id
    }
  }
}
</script>
