<template>
  <vs-prompt
    title="Chỉnh sửa cơ sở vật chất"
    accept-text= "Thêm mới"
    button-cancel = "border"
    @accept="addNewInfrastructure"
    :is-valid="validateForm"
    :active.sync="activePrompt">
    <div>
      <form>
        <div class="vx-row">
          <div class="vx-col w-full">
            <vs-input rows="5" class="w-full mb-4 mt-5" label="Tên cơ sở vật chất" v-model="infrastructureLocal.name"/>
            <vs-select v-model="infrastructureLocal.typeId" class="w-full select-large" label="Loại CSVC">
              <vs-select-item :key="index" :value="item.id" :text="item.name" v-for="(item, index) in typeList" class="w-full" />
            </vs-select>
            <vs-input rows="5" class="w-full mb-4 mt-5" label="Số lượng" v-model="infrastructureLocal.quantity" />
            <vs-input rows="5" class="w-full mb-4 mt-5" label="Đơn vị tính" v-model="infrastructureLocal.unit" />
            <vs-input rows="5" class="w-full mb-4 mt-5" label="Ghi chú" v-model="infrastructureLocal.note" />
          </div>
        </div>
      </form>
    </div>
  </vs-prompt>
</template>

<script>
  export default {
    props: {
      activeInfrastructurePrompt: {
        type: Boolean,
        require: true
      },
      infrastructureId: {
        type: Number,
        require: false
      }
    },
    data() {
      return {
        infrastructureLocal: Object.assign({}, this.$store.getters["infrastructure/getDetailInfrastructure"](this.infrastructureId))
      }
    },
    computed: {
      validateForm() {
        return !this.errors.any() && this.infrastructureLocal.name !== ''
      },
      activePrompt: {
        get() {
          return this.activeInfrastructurePrompt
        },
        set(value) {
          this.$emit('hideInfrastructureDetailPrompt', value)
        }
      },
      typeList() {
        return Object.assign({}, this.$store.getters["infrastructure/getListInfrastructureType"])
      }
    },
    methods: {
      addNewInfrastructure() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.$store.dispatch("infrastructure/updateInfrastructureById", this.infrastructureLocal).then((response) => {
              let payload = {
                page_number: 1,
                item_per_page: 10,
                typeId: this.$route.params.typeId
              }

              this.$store.dispatch("infrastructure/getListInfrastructure", payload);

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
