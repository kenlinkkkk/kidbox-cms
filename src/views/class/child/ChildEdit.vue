<template>
<vs-prompt
  title="Sửa thông tin trường học"
  accept-text="Cập nhật"
  cancel-text="Hủy"
  button-cancel="border"

  :active.sync="activeInfoPrompt">
  <div>

  </div>
</vs-prompt>
</template>

<script>
export default {
  name: "ChildEdit",
  props: {
    childInfoPrompt: {
      type: Boolean,
      required: true
    },
    childId: {
      type: Number,
      required: true
    }
  },
  computed: {
    activeInfoPrompt: {
      get() {
        return this.childInfoPrompt
      },
      set(value) {
        this.$emit('hiddenInfoPrompt', value)
      }
    },
  }
}
</script>

<style scoped>

</style>
