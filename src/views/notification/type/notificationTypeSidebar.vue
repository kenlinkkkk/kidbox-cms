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
      <h4>{{ Object.entries(this.data).length === 0 ? "Thêm mới" : "Cập nhật" }} loại thông báo</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

      <div class="p-6">


        <!-- NAME -->
        <vs-input label="Tên" v-model="dataName" class="mt-5 w-full" name="item-name" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('item-name')">{{ errors.first('item-name') }}</span>

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
        dataId: null,
        dataName: '',
        dataStatus: 1,


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
          const { id, name, status } = JSON.parse(JSON.stringify(this.data))
          this.dataId = id
          this.dataName = name
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
        return !this.errors.any() && this.dataName
      },
      scrollbarTag () { return this.$store.getters.scrollbarTag }
    },
    methods: {
      initValues () {
        if (this.data.id) return
          this.dataId= null
          this.dataName= ''
          this.dataStatus= 1
      },
      submitData () {
        this.$validator.validateAll().then(result => {
          if (result) {
            const obj = {
              id: this.dataId,
              name: this.dataName,
              status: this.dataStatus,
            }

            if (this.dataId !== null && this.dataId >= 0) {
              this.$store.dispatch('notificationType/updateNotificationType', obj).then((resp) => {

                this.$store.dispatch('notificationType/getNotificationTypes', {"limit": this.limit, "page": this.currentx});

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
              this.$store.dispatch('notificationType/createNewNotificationType', obj).then((resp) => {
                this.page = 1
                this.$store.dispatch('notificationType/getNotificationTypes', {"limit": this.limit, "page": this.currentx});

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
