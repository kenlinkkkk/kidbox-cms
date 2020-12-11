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
        <div class="vs-component vs-con-input-label vs-input mt-5 w-full vs-input-primary">
          <label class="vs-input--label">Trường</label>
          <v-select v-model="dataSchool" label="name" :options=this.schools class="mt-5 w-full" name="item-school" v-validate="'required'" :dir="$vs.rtl ? 'rtl' : 'ltr'" ></v-select>
          <span class="text-danger text-sm" v-show="errors.has('item-school')">{{ errors.first('item-school') }}</span>
        </div>

        <div class="vs-component vs-con-input-label vs-input mt-5 w-full vs-input-primary">
          <label class="vs-input--label">Gói cước</label>
          <v-select v-model="dataPackage" label="name" :options=this.packages class="mt-5 w-full" name="item-package" v-validate="'required'" :dir="$vs.rtl ? 'rtl' : 'ltr'" ></v-select>
          <span class="text-danger text-sm" v-show="errors.has('item-package')">{{ errors.first('item-package') }}</span>
        </div>

        <!-- Description -->
        <vs-input label="Mục đích" v-model="dataAction" class="mt-5 w-full" name="item-action"/>
        <span class="text-danger text-sm" v-show="errors.has('item-action')">{{ errors.first('item-action') }}</span>

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

        <div class="vs-component vs-con-input-label vs-input mt-5 w-full vs-input-primary">
          <label class="vs-input--label">Khuyến mãi</label>
          <v-select v-model="dataPromotion" label="name" :options=this.promotions class="mt-5 w-full" name="item-promotion" v-validate="'required'"></v-select>
          <span class="text-danger text-sm" v-show="errors.has('item-promotion')">{{ errors.first('item-promotion') }}</span>
        </div>

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
  import moduleSchool from '@/store/school/schoolStore.js'
  import moduleSubPackage from '@/store/subpackage/subPackageStore.js'
  import modulePromotion from '@/store/promotion/promotionStore.js'
  // import { mapGetters } from 'vuex'
  import vSelect from 'vue-select'

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
      VuePerfectScrollbar,
      'v-select': vSelect,
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
          const { id, school, subpackage, action, promotion, amount, status } = JSON.parse(JSON.stringify(this.data))
          this.dataId = id
          this.dataSchool = school
          this.dataPackage = subpackage
          this.dataAction = action
          this.dataPromotion = promotion
          this.dataPrice = amount
          this.dataStatus = status
          this.initValues()
        }
        // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
      }
    },
    computed: {
      // ...mapGetters([
      //   'schools',
      //   'promotions',
      //   'packages'
      // ]),
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
      scrollbarTag () { return this.$store.getters.scrollbarTag },
      schools(){
        return this.$store.getters['school/getSchools'];
      },
      promotions(){
        return this.$store.getters["promotion/getPromotions"]
      },
      packages(){
        return this.$store.getters["subpackage/getPackages"]
      }

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
              school_id: this.dataSchool.id,
              package_id: this.dataPackage.id,
              action: this.dataAction,
              promotion_id: this.dataPromotion.id,
              amount: this.dataPrice,
              status: this.dataStatus
            }

            if (this.dataId !== null && this.dataId >= 0) {
              this.$store.dispatch('chargelog/updateChargeLog', obj).then((resp) => {

                this.$store.dispatch('chargelog/getListChargeLogs', {"limit": this.limit, "page": this.currentx});

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
                this.$store.dispatch('chargelog/getListChargeLogs', {"limit": this.limit, "page": this.currentx});

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
    },
    created () {
      if (!modulePromotion.isRegistered) {
        this.$store.registerModule('promotion', modulePromotion)
        modulePromotion.isRegistered = true
      }

      this.$store.dispatch('promotion/getPromotions', {"limit": this.limit, "page": this.currentx, "is_active": 1})


      if (!moduleSubPackage.isRegistered) {
        this.$store.registerModule('subpackage', moduleSubPackage)
        moduleSubPackage.isRegistered = true
      }
      this.$store.dispatch('subpackage/getListSubPackages', {"limit": this.limit, "page": this.currentx})

      if (!moduleSchool.isRegistered) {
        this.$store.registerModule('school', moduleSchool)
        moduleSchool.isRegistered = true
      }
      this.$store.dispatch('school/getListSchool')
    },



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
