<!-- =========================================================================================
  File Name: AddNewDataSidebar.vue
  Description: Add New Data - Sidebar component
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <vs-sidebar class="add-new-data-sidebar items-no-padding" click-not-close color="primary" default-index="1" parent="body"
              position-right spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>Chi tiết nội dung thông báo</h4>
      <feather-icon @click.stop="isSidebarActiveLocal = false" class="cursor-pointer" icon="XIcon"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" :key="$vs.rtl" :settings="settings" class="scroll-area--data-list-add-new">

      <div class="p-6">

        <!-- Title -->
        <vs-input class="mt-5 w-full" label="Tiêu đề" name="item-title" v-model="dataTitle" v-validate="'required'"/>
        <span class="text-danger text-sm" v-show="errors.has('item-title')">{{ errors.first('item-title') }}</span>

        <!-- Content -->
        <vs-input class="mt-5 w-full" label="Nội dung" name="item-content" v-model="dataContent"
                  v-validate="'required'"/>
        <span class="text-danger text-sm" v-show="errors.has('item-content')">{{ errors.first('item-content') }}</span>



      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button @click="isSidebarActiveLocal = false" color="danger" type="border">Cancel</vs-button>
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
        default: () => {
        }
      }
    },
    components: {
      VuePerfectScrollbar,
    },
    data() {
      return {
        dataId: null,
        dataTitle: '',
        dataContent: '',
        dataSchool: null,
        dataClass: null,
        dataUser: null,


        settings: { // perfectscrollbar settings
          maxScrollbarLength: 60,
          wheelSpeed: .60
        }
      }
    },
    watch: {
      isSidebarActive(val) {
        if (!val) return
        if (Object.entries(this.data).length === 0) {
          this.initValues()
          this.$validator.reset()
        } else {
          const {id, title, content} = JSON.parse(JSON.stringify(this.data))
          this.dataId = id
          this.dataTitle = title
          this.dataContent = content
          this.initValues()
        }
        // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
      }
    },
    computed: {
      isSidebarActiveLocal: {
        get() {
          return this.isSidebarActive
        },
        set(val) {
          if (!val) {
            this.$emit('closeSidebar')
            // this.$validator.reset()
            // this.initValues()
          }
        }
      },
      schools() {
        return this.$store.getters["school/getOptionSchools"]
      },
      classes() {
        return this.$store.getters["class/getOptions"]
      },
      parents() {
        return this.$store.getters["user/getParents"]
      },
      isFormValid() {
        if(this.$acl.get[0]==='systemAdmin'){
          return !this.errors.any() && this.dataTitle && this.dataContent && this.dataSchool
        }
        return !this.errors.any() && this.dataTitle && this.dataContent && this.dataClass && this.dataUser
      },
      scrollbarTag() {
        return this.$store.getters.scrollbarTag
      }
    },
    methods: {

      initValues() {
        if (this.data.id) return
        this.dataId = null
        this.dataTitle = ''
        this.dataContent = ''
        this.dataSchool = null
      },

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
