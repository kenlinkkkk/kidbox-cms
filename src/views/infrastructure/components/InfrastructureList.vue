<template>
  <div class="px-4 py-4 list-item-component">
    <div class="flex justify-between">
      <div class="vx-row">
        <div class="vx-col">
          <h6 class="todo-title">{{ infrastructureDetail.name }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      infrastructureId: {
        type : Number,
        required: true
      }
    },
    data() {
      return {
        infrastructureDetail: this.$store.getters["infrastructure/getDetailInfrastructure"](this.infrastructureId)
      }
    }
  }
</script>
