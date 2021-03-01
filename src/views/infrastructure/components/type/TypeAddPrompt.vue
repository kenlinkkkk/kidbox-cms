<template>
  <vs-prompt
    title="Cơ sở vật chất"
    accept-text= "Thêm mới"
    button-cancel = "border"
    @cancel="clearTypeFields"
    @accept="addNewType"
    @close="clearTypeFields"
    :is-valid="validateForm"
    :active.sync="activeInfrastructureTypePrompt">
    <div>
      <form>
        <div class="vx-row">
          <div class="vx-col w-full">
            <vs-input rows="5" class="w-full mb-4 mt-5" label="Tên loại cơ sở vật chất" v-model="typeLocal.name" />
          </div>
        </div>
      </form>
    </div>
  </vs-prompt>
</template>

<script>
  export default {
    props: {
      activeInfrastructureTypePrompt: {
        type: Boolean,
        require: true
      }
    },
    data() {
      return {
        typeLocal: {
          name: '',
        }
      }
    },
    computed: {
      validateForm() {
        return !this.errors.any() && this.typeLocal.name !== ''
      },
      activePrompt: {
        get() {
          return this.activeInfrastructureTypePrompt
        },
        set(value) {
          this.$emit('hiddenTypePrompt', value)
        }
      }
    },
    methods: {
      clearTypeFields() {
        Object.assign(this.typeLocal, {
          name: ''
        });
      },
      addNewType() {
        this.$validator.validateAll().then((result) => {
            if (result) {
              this.$store.dispatch("infrastructure/infrastructureTypeAdd", this.typeLocal).then((response) => {
                this.$store.dispatch("infrastructure/infrastructureTypeList", {page: 1, limit: 10});

                this.$vs.notify({
                  title:'Cập nhật thông tin thành công',
                  text: response.data.message,
                  position: 'top-right',
                  color:'success',
                  iconPack: 'feather',
                  icon:'icon-check'
                });
              }).catch((error) => {
                this.$vs.notify({
                  title:'Cập nhật thông tin thành công',
                  text: error.message,
                  position: 'top-right',
                  color:'success',
                  iconPack: 'feather',
                  icon:'icon-check'
                });
              })
            }
      })
      }
    }
  }
</script>

<style scoped>

</style>
