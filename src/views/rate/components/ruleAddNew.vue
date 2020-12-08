
<template>
    <div class="px-6 pb-2 pt-6">
    <vs-button @click="activePrompt = true" class="w-full">Thêm  mới Tiêu chí</vs-button>
    <vs-prompt
        title="Thêm  mới Tiêu chí"
        accept-text= "Thêm  mới"
        button-cancel = "border"
        @cancel="clearFields"
        @accept="addTodo"
        @close="clearFields"
        :is-valid="validateForm"
        :active.sync="activePrompt">
        <div>
            <form>
                <div class="vx-row">

                    <div class="vx-col w-full">
                        <feather-icon icon="StarIcon" class="cursor-pointer" :svgClasses="[{'text-warning stroke-current': ruleLocal.has_point}, 'w-5', 'h-5 mr-4']" @click.prevent="ruleLocal.has_point = !ruleLocal.has_point"></feather-icon> Có điểm

                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col w-full">
                        <vs-textarea rows="5" label="Tiêu chí" v-model="ruleLocal.name" />
                    </div>
                </div>


            </form>
        </div>
    </vs-prompt>
    </div>
</template>


<script>
export default {
  data () {
    return {
      activePrompt: false,

      ruleLocal: {
        name: '',
        has_point: false,
      }
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.ruleLocal.name !== ''
    }
  },
  methods: {
    clearFields () {
      Object.assign(this.ruleLocal, {
        name: '',
        has_point: false,
      })
    },
    addTodo () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store.dispatch('rate/createNewRule', Object.assign({},this.ruleLocal)).then((resp) => {
            this.clearFields()
            this.$store.dispatch('rate/getListRules');

            this.$vs.notify({
              title:'Cập nhật thông tin thành công',
              text: resp.data.message,
              position: 'top-right',
              color:'success',
              iconPack: 'feather',
              icon:'icon-check'
            });
          }).catch((error) => {
            this.$vs.notify({
              title:'Lỗi',
              text: error.message,
              position: 'top-right',
              color:'danger',
              iconPack: 'feather',
              icon:'icon-x'
            });
          })
        }
      })
    }
  }
}
</script>
