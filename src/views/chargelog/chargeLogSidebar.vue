<!-- =========================================================================================
  File Name: AddNewDataSidebar.vue
  Description: Add New Data - Sidebar component
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>{{ Object.entries(this.data).length === 0 ? "Thêm mới" : "Cập nhật" }} thanh toán cước phí</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

      <div class="p-6">

        <vs-select v-model="dataSchool" label="Trường" class="mt-5 w-full" name="item-school" v-validate="'required'">
          <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in school_choices" />
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('item-category')">{{ errors.first('item-category') }}</span>

        <vs-select v-model="dataPackage" label="Gói cước" class="mt-5 w-full" name="item-school" v-validate="'required'">
          <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in package_choices" />
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('item-category')">{{ errors.first('item-category') }}</span>

        <!-- Description -->
        <vs-input label="Mục đích" v-model="dataAction" class="mt-5 w-full" name="item-description"/>
        <span class="text-danger text-sm" v-show="errors.has('item-description')">{{ errors.first('item-description') }}</span>

        <!-- PRICE -->
        <vs-input
          icon-pack="feather"
          icon="icon-dollar-sign"
          label="Số tiền"
          v-model="dataPrice"
          class="mt-5 w-full"
          v-validate="{ required: true, regex: /\d+(\.\d+)?$/ }"
          name="item-price" />
        <span class="text-danger text-sm" v-show="errors.has('item-price')">{{ errors.first('item-price') }}</span>

        <vs-select v-model="dataPromotion" label="Khuyến mãi" class="mt-5 w-full" name="item-school" v-validate="'required'">
          <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in promotion_choices" />
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('item-category')">{{ errors.first('item-category') }}</span>

        <!-- ORDER STATUS -->
        <vs-select v-model="dataStatus" label="Trạng thái" class="mt-5 w-full">
          <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in status_choices" />
        </vs-select>



      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submitData" :disabled="!isFormValid">Submit</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'

  export default {
    props: {
      isSidebarActive: {
        type: Boolean,
        required: true
      },
      data: {
        type: Object,
        default: () => {}
      }
    },
    components: {
      VuePerfectScrollbar
    },
    data () {
      return {
        page: 1,
        dataId: null,
        dataSchool: null,
        dataPackage: null,
        dataAction: '',
        dataPromotion: null,
        dataStatus: 1,
        dataPrice: 0,

        status_choices: [
          {text:'Kích hoạt', value:1},
          {text:'Hủy', value:0},
        ],

        settings: { // perfectscrollbar settings
          maxScrollbarLength: 60,
          wheelSpeed: .60
        }
      }
    },
    watch: {
      isSidebarActive (val) {
        if (!val) return
        if (Object.entries(this.data).length === 0) {
          this.initValues()
          this.$validator.reset()
        } else {
          const { id, school_id, package_id, action, promotion_id, amount, status } = JSON.parse(JSON.stringify(this.data))
          this.dataId = id
          this.dataSchool = school_id
          this.dataPackage = package_id
          this.dataAction = action
          this.dataPromotion = promotion_id
          this.dataPrice = amount
          this.dataStatus = status
          this.initValues()
        }
        // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
      }
    },
    computed: {

      isSidebarActiveLocal: {
        get () {
          return this.isSidebarActive
        },
        set (val) {
          if (!val) {
            this.$emit('closeSidebar')
            // this.$validator.reset()
            // this.initValues()
          }
        }
      },
      isFormValid () {
        return !this.errors.any() && this.dataSchool && this.dataPackage && this.dataAction   && this.dataPromotion && this.dataPrice > 0
      },
      scrollbarTag () { return this.$store.getters.scrollbarTag }
    },
    methods: {
      initValues () {
        if (this.data.id) return
          this.dataId= null
          this.dataSchool= null
          this.dataPackage= null
          this.dataAction= ''
          this.dataPromotion= null
          this.dataStatus= 1
          this.dataPrice= 0
      },
      submitData () {
        this.$validator.validateAll().then(result => {
          if (result) {
            const obj = {
              id: this.dataId,
              school_id: this.dataSchool,
              package_id: this.dataPackage,
              action: this.dataAction,
              numberOfUser: this.dataPromotion,
              amount: this.dataPrice,
              status: this.dataStatus
            }

            if (this.dataId !== null && this.dataId >= 0) {
              this.$store.dispatch('chargelog/updateChargeLog', obj).then((resp) => {

                this.$store.dispatch('chargelog/getListChargeLogs', this.page);

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
            } else {
              delete obj.id
              this.$store.dispatch('chargelog/createNewChargeLog', obj).then((resp) => {
                this.page = 1
                this.$store.dispatch('chargelog/getListChargeLogs', this.page);

                this.$vs.notify({
                  title:'Thêm mới thành công',
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

            this.$emit('closeSidebar')
            this.initValues()
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .add-new-data-sidebar {
    ::v-deep .vs-sidebar--background {
      z-index: 52010;
    }

    ::v-deep .vs-sidebar {
      z-index: 52010;
      width: 400px;
      max-width: 90vw;

      .img-upload {
        margin-top: 2rem;

        .con-img-upload {
          padding: 0;
        }

        .con-input-upload {
          width: 100%;
          margin: 0;
        }
      }
    }
  }

  .scroll-area--data-list-add-new {
    // height: calc(var(--vh, 1vh) * 100 - 4.3rem);
    height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px);

    &:not(.ps) {
      overflow-y: auto;
    }
  }
</style>
