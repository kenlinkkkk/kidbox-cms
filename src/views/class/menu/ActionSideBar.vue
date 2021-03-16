<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>{{ this.data.id === undefined ? "THÊM MỚI" : "CẬP NHẬT" }} THỰC ĐƠN</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">
      <div class="p-6">

      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submitData" :disabled="!isFormValid">Lưu</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Hủy</vs-button>
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
        dataItem: {
          name: "",
          image_url: "",
          time: ""
        },
        dataList: [],
        settings: {
          maxScrollbarLength: 60,
          wheelSpeed: .60
        }
      }
    },
    watch: {
      isSidebarActive (val) {
        if (!val) return
        if (this.data.id === 0) {
          this.initValues()
          this.$validator.reset()
        } else if(this.data.id !== 0) {
          const { category, id, img, name, order_status, price } = JSON.parse(JSON.stringify(this.data))
          this.dataId = id
          this.dataCategory = category
          this.dataImg = img
          this.dataName = name
          this.dataOrder_status = order_status
          this.dataPrice = price
          this.initValues()
        }
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
          }
        }
      },
      isFormValid () {
        return !this.errors.any() && this.dataName && this.dataCategory && this.dataPrice > 0
      },
      scrollbarTag () { return this.$store.getters.scrollbarTag }
    },
    methods: {
      initValues () {
        console.log(this.data)
        // if (this.data.id !== undefined) {
        //
        // }
      },
      submitData () {
        this.$validator.validateAll().then(result => {
          if (result) {
            const obj = {
              id: this.dataId,
              name: this.dataName,
              img: this.dataImg,
              category: this.dataCategory,
              order_status: this.dataOrder_status,
              price: this.dataPrice
            }

            if (this.dataId !== null && this.dataId >= 0) {
              this.$store.dispatch('dataList/updateItem', obj).catch(err => { console.error(err) })
            } else {
              delete obj.id
              obj.popularity = 0
              this.$store.dispatch('dataList/addItem', obj).catch(err => { console.error(err) })
            }

            this.$emit('closeSidebar')
            this.initValues()
          }
        })
      },
      updateCurrImg (input) {
        if (input.target.files && input.target.files[0]) {
          const reader = new FileReader()
          reader.onload = e => {
            this.dataImg = e.target.result
          }
          reader.readAsDataURL(input.target.files[0])
        }
      }
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
