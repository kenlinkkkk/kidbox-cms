<template>
  <div class="flex items-center">
    <vs-avatar :src="params.data.avatar.path" class="flex-shrink-0 mr-2" size="30px" @click="$router.push(url)" />
    <router-link :to="url" @click.stop.prevent class="text-inherit hover:text-primary">{{ params.data.login }}</router-link>
  </div>
</template>

<script>
export default {
  name: 'CellRendererLink',
  computed: {
    url () {
      return '/admin/user/view/' + this.params.data.id
    }
  }
}
</script>
