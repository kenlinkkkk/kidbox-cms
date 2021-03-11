<template>
  <div @click="showInfrastructureDetailPrompt" class="px-4 py-4 list-item-component">
    <div class="vx-row">
      <div class="vx-col w-full sm:w-5/6 flex sm:items-center sm:flex-row flex-col">
        <div class="flex items-center">
          <h6 class="todo-title" :class="infrastructureDetail.status === 0 ? 'line-through' : ''">{{ infrastructureDetail.name }}</h6>
        </div>
        <div class="todo-tags sm:ml-2 sm:my-0 my-2 flex">
          <vs-chip transparent color="primary">
            Số lượng : {{ infrastructureDetail.quantity +" "+ infrastructureDetail.unit}}
          </vs-chip>
        </div>
      </div>

      <div class="vx-col w-full sm:w-1/6 ml-auto flex sm:justify-end">
        <feather-icon
          icon="CheckIcon"
          class="cursor-pointer"
          svgClasses="w-5 h-5 mr-2"
          @click.stop="moveToTrash" />
        <feather-icon
          icon="TrashIcon"
          class="cursor-pointer"
          svgClasses="w-5 h-5"
          @click.stop="moveToTrash" />
      </div>
    </div>
    <div class="vx-row" v-if="infrastructureDetail.note">
      <div class="vx-col w-full">
        <p class="mt-2 truncate">{{ infrastructureDetail.note }}</p>
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
    },
    methods: {
      moveToTrash() {
        let payload = {
          id: this.infrastructureId
        }
        this.$store.dispatch("infrastructure/deleteInfrastructureById", payload).then((response) => {
          this.$vs.notify({
            title: 'Xóa thành công',
            text: response.data.message,
            position: 'top-right',
            color: 'success',
            iconPack: 'feather',
            icon: 'icon-check'
          })
        }).catch((error) => {
          this.$vs.notify({
            title: 'Xóa thành công',
            text: error.message,
            position: 'top-right',
            color: 'success',
            iconPack: 'feather',
            icon: 'icon-check'
          })
        });
      },
      showInfrastructureDetailPrompt() {
        this.$emit('showInfrastructureDetailPrompt', this.infrastructureId)
      }
    }
  }
</script>
