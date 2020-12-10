<template>
  <vs-prompt
    title="Chi tiết tiêu chí"
    accept-text="Cập nhật"
    cancel-text="Hủy"
    button-cancel="border"
    @accept="submitInfo"
    @close="clearFields"
    @cancel="clearFields"
    :active.sync="activePrompt">
    <div>
      <form>
        <div class="vx-row">

          <div class="vx-col w-full">
            <feather-icon icon="StarIcon" class="cursor-pointer" :svgClasses="[{'text-warning stroke-current': ruleLocal.has_point==='true'}, 'w-5', 'h-5 mr-4']" @click.prevent="click_has_point"></feather-icon> Có điểm

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
</template>
<script>
  export default {
    props: {
      displayPrompt: {
        type: Boolean,
        required: true
      },
      ruleId: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        ruleLocal: Object.assign({}, this.$store.getters['rate/getRule'](this.ruleId)),
      }
    },
    methods: {
      click_has_point(){
        if(this.ruleLocal.has_point === 'true'){
          this.ruleLocal.has_point = 'false'
        }else{
          this.ruleLocal.has_point = 'true'
        }

      },
      clearFields () {
      },
      async submitInfo() {
        let rateInfo = JSON.parse(JSON.stringify(this.ruleLocal))
        this.$store.dispatch('rate/updateRule', rateInfo).then((resp) => {
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
      },
    },
    computed: {
      activePrompt: {
        get() {
          return this.displayPrompt
        },
        set(value) {
          this.$emit('hiddenDisplayPrompt', value)
        }
      },
      validateForm() {
        if (this.ruleLocal.name === '') {
          return false
        }
        return !this.errors.any()
      }
    }
  }
</script>
