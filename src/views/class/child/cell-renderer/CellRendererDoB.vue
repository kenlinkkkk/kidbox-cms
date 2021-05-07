<template>
  <p>{{ rewriteDateOfBirth }}</p>
</template>

<script>
export default {
  name: "CellRendererDoB",
  computed: {
    rewriteDateOfBirth () {
      let date = new Date(this.params.data.dob)

      return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
    }
  },
}
</script>

<style scoped>

</style>
