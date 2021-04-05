<template>
  <div id="todo-app" class="border border-solid d-theme-border-grey-light rounded relative overflow-hidden">
    <vs-sidebar class="items-no-padding" parent="#todo-app" :click-not-close="clickNotClose" :hidden-background="clickNotClose" v-model="isSidebarActive">
      <class-list @closeSidebar="toggleTypeSidebar" />
    </vs-sidebar>

    <div :class="{'sidebar-spacer': clickNotClose}" class="no-scroll-content border border-r-0 border-b-0 border-t-0 border-solid d-theme-border-grey-light no-scroll-content">

      <div class="flex d-theme-dark-bg items-center border border-l-0 border-r-0 border-t-0 border-solid d-theme-border-grey-light">
        <!-- TOGGLE SIDEBAR BUTTON -->
        <feather-icon class="md:inline-flex lg:hidden ml-4 mr-4 cursor-pointer" icon="MenuIcon" @click.stop="toggleTypeSidebar(true)" />
        <!-- SEARCH BAR -->
        <!--         <vs-input icon-no-border size="large" icon-pack="feather" icon="icon-search" placeholder="Search..." v-model="searchQuery" class="vs-input-no-border vs-input-no-shdow-focus w-full" />-->
      </div>
      <vue-perfect-scrollbar :is="scrollbarTag" class="todo-content-scroll-area"  @ps-scroll-y="scrollHanle" :settings="settings" :key="$vs.rtl" ref="taskListPS">
        <transition-group class="todo-list" name="list-enter-up" tag="ul"  appear v-if="listStudents !== null">
          <li
            class="cursor-pointer todo_todo-item"
            v-for="(item, index) in listStudents"
            :key="String(currFilter) + 'r' + String(item.child.id)"
            :style="[{transitionDelay: (index * 0.1) + 's'}]">
            <child-list :key="item.id" :studentId="item.child.id"/>
          </li>
        </transition-group>
      </vue-perfect-scrollbar>
    </div>
  </div>
</template>

<script>
  import moduleClass from '@/store/class/classStore.js'
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';
  import ClassList from "./components/ClassList";
  import ChildList from "./components/ChildList";

  export default {
    data () {
      return {
        configLoadPage: {
          limit: 10,
          page: 1,
          default: "f"
        },
        currFilter                    : '',
        clickNotClose                 : true,
        isSidebarActive               : true,
        searchQuery: '',
        settings : {
          maxScrollbarLength : 60,
          wheelSpeed         : 0.30,
          suppressScrollY: false,
          suppressScrollX: false,
          wheelPropagation: false
        }
      }
    },
    components: {
      VuePerfectScrollbar,
      ClassList,
      ChildList
    },
    watch: {
      windowWidth() {
        this.setSidebarWidth()
      },
      classFilter() {
        this.toggleTypeSidebar();
        let config = {
          class_id: this.$route.params.classId,
        }

        this.$store.dispatch('class/getCheckinInfo', config)

        const scroll_el = this.$refs.taskListPS.$el || this.$refs.taskListPS
        scroll_el.scrollTop = 0
      }
    },
    computed: {
      listStudents () {   return this.$store.getters['class/getListStudents']   },
      windowWidth ()  {   return this.$store.state.windowWidth                  },
      scrollbarTag () {   return this.$store.getters.scrollbarTag               },
      classFilter()   {   return this.$route.params.classId                     }
    },
    methods: {
      scrollHanle({ target: { scrollTop, clientHeight, scrollHeight }}) {
        if (scrollTop + clientHeight >= scrollHeight) {
          this.configLoadPage.page += 1

          if (this.$acl.check('Teacher')) {
            Object.assign(this.configLoadPage, { id_teacher: this.$store.state.AppActiveUser.uid})
          }
          if (this.$route.query.c) {
            this.$store.dispatch('class/getClassBySchoolId', { schoolId: this.$route.query.c, ...this.configLoadPage});
          } else {
            this.$store.dispatch('class/getClassBySchoolId', { schoolId: this.$store.state.AppActiveUser.schoolId, ...this.configLoadPage});
          }
        }
      },
      setSidebarWidth () {
        if (this.windowWidth < 992) {
          this.isSidebarActive = this.clickNotClose = false
        } else {
          this.isSidebarActive = this.clickNotClose = true
        }
      },
      toggleTypeSidebar (value = false) {
        if (!value && this.clickNotClose) return
        this.isSidebarActive = value
      },
      clickStudent() {
        console.log('click')
      }
    },
    created() {
      this.setSidebarWidth();
      this.$store.registerModule('class', moduleClass);

      if (this.$acl.check('Teacher')) {
        Object.assign(this.configLoadPage, { id_teacher: this.$store.state.AppActiveUser.uid})
      }

      if (this.$route.query.c) {
        this.$store.dispatch('class/getClassBySchoolId', { schoolId: this.$route.query.c, ...this.configLoadPage});
      } else {
        this.$store.dispatch('class/getClassBySchoolId', { schoolId: this.$store.state.AppActiveUser.schoolId, ...this.configLoadPage});
      }
      this.$store.dispatch('userManagement/getRoleList', this.configLoadPage)
    },
    mounted () {
      this.wasSidebarOpen = this.$store.state.reduceButton
      this.$store.commit('TOGGLE_REDUCE_BUTTON', true)
    },
    beforeDestroy () {
      if (!this.wasSidebarOpen) this.$store.commit('TOGGLE_REDUCE_BUTTON', false)
      this.$store.unregisterModule('class')
    },
    beforeUpdate() {
      this.currFilter = this.$route.params.classId;
    }
  }
</script>

<style lang="scss">
  @import "@/assets/scss/vuexy/apps/todo.scss";
</style>
