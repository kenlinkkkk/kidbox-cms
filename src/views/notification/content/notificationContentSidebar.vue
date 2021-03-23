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
      <h4>{{ Object.entries(this.data).length === 0 ? "Thêm mới" : "Cập nhật" }} nội dung thông báo</h4>
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

        <div class="vs-component vs-con-input-label vs-input mt-5 w-full vs-input-primary"
             v-if="this.dataId === null && $acl.check('admin')">
          <label class="vs-input--label">Trường</label>
          <v-select :dense="true" height="100px" :closeOnSelect="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" :options=this.schools @input="inputSchools" @open="onOpenSchools" @search="searchSchools"
                    label="name" multiple name="item-school" v-model="dataSchool"
                    v-validate="'required'"></v-select>
          <span class="text-danger text-sm" v-show="errors.has('item-school')">{{ errors.first('item-school') }}</span>
        </div>

        <div class="vs-component vs-con-input-label vs-input mt-5 w-full vs-input-primary"
             v-if="this.dataId === null && $acl.check('systemAdmin')">
          <label class="vs-input--label">Lớp</label>
          <v-select :closeOnSelect="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" :options=this.classes @input="inputClasses" @open="onOpenClasses"
                    @search="searchClasses" label="name" multiple name="item-class" v-model="dataClass"
                    v-validate="'required'"></v-select>
          <span class="text-danger text-sm" v-show="errors.has('item-class')">{{ errors.first('item-class') }}</span>
        </div>

        <div class="vs-component vs-con-input-label vs-input mt-5 w-full vs-input-primary"
             v-if="this.dataId === null && $acl.check('systemAdmin')">
          <label class="vs-input--label">Phụ huynh</label>
          <v-select :closeOnSelect="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" :options=this.parents @input="inputUsers" @search="searchUsers" label="name"
                    multiple name="item-user" v-model="dataUser" v-validate="'required'">
          </v-select>
          <span class="text-danger text-sm" v-show="errors.has('item-user')">{{ errors.first('item-user') }}</span>
        </div>


      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button :disabled="!isFormValid" @click="submitData" class="mr-6">Submit</vs-button>
      <vs-button @click="isSidebarActiveLocal = false" color="danger" type="border">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'
  import moduleSchool from '@/store/school/schoolStore.js'
  import moduleClass from '@/store/class/classStore.js'
  // import moduleUser from '@/store/user/userStore.js'
  import vSelect from 'vue-select'

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
      'v-select': vSelect,
    },
    data() {
      return {
        page: 1,
        limit: 100,
        searchSchoolKey: null,
        searchClassKey: null,
        searchUserKey: null,
        dataId: null,
        dataTitle: '',
        dataContent: '',
        dataSchool: null,
        dataClass: null,
        dataUser: null,
        classIds: [],


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
      inputSchools(){
        let flag = 0
        let all_value = null
        this.dataSchool.forEach((value) => {
          if (value.id === -1) {
            flag = 1
            all_value = value
          }
        })
        if (flag === 1) {
          this.dataSchool = []
          this.dataSchool.push(all_value)
        }
      },
      onOpenSchools() {
        if (this.searchSchoolKey === null) {
          this.$store.dispatch('school/getListSchool', {"limit": this.limit, "page": this.page, "key_word": '', "status": 1});
          this.searchSchoolKey = ''
        }
      },
      searchSchools(search, loading) {
        loading(true)
        this.$store.dispatch('school/getListSchool', {"limit": this.limit, "page": this.page, "key_word": search, "status": 1});
        this.searchSchoolKey = search
        loading(false)
      },
      onOpenClasses() {
        if (this.searchClassKey === null) {
          this.$store.dispatch('class/getAllBySchoolId', {
            "key_word": '',
          });
          this.searchClassKey = ''
        }
      },
      searchClasses(search, loading) {
        loading(true)
        this.$store.dispatch('class/getAllBySchoolId', {
          "name": search,
        });
        this.searchClassKey = search
        loading(false)
      },
      inputClasses() {
        this.classIds = []
        let class_value = null
        let flag = 0
        this.dataClass.forEach((value) => {
          if (value.id === -1) {
            flag = 1
            class_value = value
          }
        })
        if (flag === 1) {
          this.classIds = [-1]
          this.dataClass = []
          this.dataClass.push(class_value)
        }else {
          this.dataClass.forEach((value) => {
            this.classIds.push(value.id)
          })
        }
        this.$store.dispatch('user/getUserByClass', {
          "key_word": '',
          "class_ids": this.classIds
        })
        if (this.dataUser != null) {
          if(flag === 0) {
            this.dataUser.forEach((value) => {

              if (!this.classIds.includes(value.class_id)) {
                this.dataUser.pop(value)
              }
            })
          }
        }

        this.searchUserKey = ''
      },
      // onOpenUsers(){
      //   if(this.searchUserKey === null){
      //     this.$store.dispatch('user/getUserByClass',{"limit": this.limit, "page": this.page, "key_word": ''});
      //     this.searchUserKey = ''
      //   }
      // },
      searchUsers(search, loading) {
        loading(true)
        this.$store.dispatch('user/getUserByClass', {"name": search, "class_ids": this.class_ids});
        this.searchUserKey = search
        loading(false)
      },
      inputUsers() {
        let flag = 0
        let user_value = null
        this.dataUser.forEach((value) => {
          if (value.id === -1) {
            flag = 1
            user_value = value
          }
        })
        if (flag === 1) {
          this.dataUser = []
          this.dataUser.push(user_value)
        }
      },

      initValues() {
        if (this.data.id) return
        this.dataId = null
        this.dataTitle = ''
        this.dataContent = ''
        this.dataSchool = null
      },
      submitData() {
        this.$validator.validateAll().then(result => {
          if (result) {
            let arrSchoolId = [];
            if (this.dataSchool != null) {
              this.dataSchool.forEach((value) => {
                arrSchoolId.push(value.id)
              })
            }
            let arrClassId = [];
            if (this.dataClass != null) {
              this.dataClass.forEach((value) => {
                arrClassId.push(value.id)
              })
            }
            let arrUserId = [];
            if (this.dataUser != null) {
              this.dataUser.forEach((value) => {
                arrUserId.push(value.id)
              })
            }
            const obj = {
              id: this.dataId,
              title: this.dataTitle,
              content: this.dataContent,
              school_ids: arrSchoolId,
              class_room_ids: arrClassId,
              user_ids: arrUserId
            }
            if (this.dataId !== null && this.dataId >= 0) {
              this.$store.dispatch('notificationContent/update', obj).then((resp) => {

                this.$store.dispatch('notificationContent/getAll', {"limit": this.limit, "page": this.currentx});

                this.$vs.notify({
                  title: 'Cập nhật thông tin thành công',
                  text: resp.data.message,
                  position: 'top-right',
                  color: 'success',
                  iconPack: 'feather',
                  icon: 'icon-check'
                });
              }).catch((error) => {
                this.$vs.notify({
                  title: 'Lỗi',
                  text: error.message,
                  position: 'top-right',
                  color: 'danger',
                  iconPack: 'feather',
                  icon: 'icon-x'
                });
              })
            } else {
              delete obj.id
              this.$store.dispatch('notificationContent/createNew', obj).then((resp) => {
                this.page = 1
                this.$store.dispatch('notificationContent/getAll', {"limit": this.limit, "page": this.currentx});

                this.$vs.notify({
                  title: 'Thêm mới thành công',
                  text: resp.data.message,
                  position: 'top-right',
                  color: 'success',
                  iconPack: 'feather',
                  icon: 'icon-check'
                });
              }).catch((error) => {
                this.$vs.notify({
                  title: 'Lỗi',
                  text: error.message,
                  position: 'top-right',
                  color: 'danger',
                  iconPack: 'feather',
                  icon: 'icon-x'
                });
              })
            }

            this.$emit('closeSidebar')
            this.initValues()
          }
        })
      },

    },
    created() {


      if (!moduleSchool.isRegistered) {
        this.$store.registerModule('school', moduleSchool)
        moduleSchool.isRegistered = true
      }
      if (!moduleClass.isRegistered) {
        this.$store.registerModule('class', moduleClass)
        moduleClass.isRegistered = true
      }
      // if (!moduleUser.isRegistered) {
      //   this.$store.registerModule('user', moduleUser)
      //   moduleUser.isRegistered = true
      // }
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
