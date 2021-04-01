<template>
  <p>{{ classId }}</p>
</template>

<script>
  export default {
    props: {
      classId: {
        type: Number,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>
