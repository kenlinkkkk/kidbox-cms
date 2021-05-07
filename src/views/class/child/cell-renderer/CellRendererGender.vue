<template>
  <p>{{ rewriteGender }}</p>
</template>

<script>
export default {
  name: "CellRendererGender",
  computed: {
    rewriteGender () {
      return this.params.data.gender === 1 ? 'Nam' : 'Nữ'
    }
  }
}
</script>

