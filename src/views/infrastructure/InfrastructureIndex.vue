<template>
  <div id="todo-app" class="border border-solid d-theme-border-grey-light rounded relative overflow-hidden">
    <vs-sidebar class="items-no-padding" parent="#todo-app" :click-not-close="clickNotClose" :hidden-background="clickNotClose" v-model="isSidebarActive">
      <infrastructure-type-add-new/>
      <infrastructure-type-list @closeSidebar="toggleTodoSidebar"></infrastructure-type-list>

    </vs-sidebar>

    <div :class="{'sidebar-spacer': clickNotClose}" class="no-scroll-content border border-r-0 border-b-0 border-t-0 border-solid d-theme-border-grey-light no-scroll-content">

      <div class="flex d-theme-dark-bg items-center border border-l-0 border-r-0 border-t-0 border-solid d-theme-border-grey-light">
        <!-- TOGGLE SIDEBAR BUTTON -->
        <feather-icon class="md:inline-flex lg:hidden ml-4 mr-4 cursor-pointer" icon="MenuIcon" @click.stop="toggleTodoSidebar(true)" />
        <!-- SEARCH BAR -->
<!--         <vs-input icon-no-border size="large" icon-pack="feather" icon="icon-search" placeholder="Search..." v-model="searchQuery" class="vs-input-no-border vs-input-no-shdow-focus w-full" />-->
      </div>
      <!-- INFRASTRUCTURE LIST -->
      <vue-perfect-scrollbar :is="scrollbarTag" class="todo-content-scroll-area"  @ps-scroll-y="scrollHanle" :settings="settings" :key="$vs.rtl" ref="taskListPS">
        <transition-group class="todo-list" name="list-enter-up" tag="ul"  appear v-if="infrastructures != null">
          <li
            class="cursor-pointer todo_todo-item"
            v-for="(item, index) in infrastructures"
            :key="String(currFilter) + 'r' + String(item.id)"
            :style="[{transitionDelay: (index * 0.1) + 's'}]">
            <infrastructure-list :rateId="item.id"  :key="String(item.id)" />
          </li>
        </transition-group>
        <div v-if="infrastructures === null">Chưa có thông tin cơ sở vật chất</div>
      </vue-perfect-scrollbar>
      <!-- /INFRASTRUCTURE LIST -->
    </div>
  </div>
</template>

<script>
  import infrastructureModule from "@/store/infrastructure/infrastructureStore";
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';
  import InfrastructureTypeList from "./components/InfrastructureTypeList";
  import InfrastructureTypeAddNew from "./components/InfrastructureTypeAddNew";
  import InfrastructureList from "./components/InfrastructureList";

  export default {
    data() {
      return {
        page: 1,
        limit: 10,
        currFilter           : '',
        clickNotClose        : true,
        displayPrompt        : false,
        taskIdToEdit         : 0,
        isSidebarActive      : true,
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
    watch: {
      windowWidth() {
        this.setSidebarWidth()
      }
    },
    computed: {
      infrastructures(){ return this.$store.getters["rate/getRates"] },
      windowWidth ()  { return this.$store.state.windowWidth },
      scrollbarTag () { return this.$store.getters.scrollbarTag },
    },
    methods: {
      scrollHanle({ target: { scrollTop, clientHeight, scrollHeight }}) {
        if (scrollTop + clientHeight >= scrollHeight) {
          this.page+=1
          const payload = {
            "ruleId": this.$route.params.ruleId,
            "item_per_page": this.size,
            "page_number": this.page
          }
          this.$store.dispatch("infrastructure/scrollRates", payload);
        }
      },
      setSidebarWidth () {
        if (this.windowWidth < 992) {
          this.isSidebarActive = this.clickNotClose = false
        } else {
          this.isSidebarActive = this.clickNotClose = true
        }
      },
      toggleTodoSidebar (value = false) {
        if (!value && this.clickNotClose) return
        this.isSidebarActive = value
      },
    },
    components: {
      VuePerfectScrollbar,
      InfrastructureTypeList,
      InfrastructureTypeAddNew,
      InfrastructureList
    },
    created() {
      this.setSidebarWidth();
      this.$store.registerModule("infrastructure", infrastructureModule);
      this.page = 1;
      this.$store.dispatch("infrastructure/infrastructureTypeList", {page: this.page, limit: this.limit});
    },
    beforeDestroy() {
      this.$store.unregisterModule("infrastructure");
    },
    beforeUpdate() {

    }
  }
</script>
<style lang="scss">
  @import "@/assets/scss/vuexy/apps/todo.scss";
</style>
