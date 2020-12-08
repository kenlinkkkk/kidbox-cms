<template>
  <div id="todo-app" class="border border-solid d-theme-border-grey-light rounded relative overflow-hidden">
        <vs-sidebar class="items-no-padding" parent="#todo-app" :click-not-close="clickNotClose" :hidden-background="clickNotClose" v-model="isSidebarActive">

          <rule-add-new/>
          <rule-filter @closeSidebar="toggleTodoSidebar"></rule-filter>

        </vs-sidebar>

        <div :class="{'sidebar-spacer': clickNotClose}" class="no-scroll-content border border-r-0 border-b-0 border-t-0 border-solid d-theme-border-grey-light no-scroll-content">

            <div class="flex d-theme-dark-bg items-center border border-l-0 border-r-0 border-t-0 border-solid d-theme-border-grey-light">

                <!-- TOGGLE SIDEBAR BUTTON -->
                <feather-icon class="md:inline-flex lg:hidden ml-4 mr-4 cursor-pointer" icon="MenuIcon" @click.stop="toggleTodoSidebar(true)" />

                <!-- SEARCH BAR -->
                <!-- <vs-input icon-no-border size="large" icon-pack="feather" icon="icon-search" placeholder="Search..." v-model="searchQuery" class="vs-input-no-border vs-input-no-shdow-focus w-full" /> -->
            </div>

            <!-- TODO LIST -->
            <!-- <component :is="scrollbarTag" class="todo-content-scroll-area" :settings="settings" ref="taskListPS" :key="$vs.rtl"> -->
              <vue-perfect-scrollbar :is="scrollbarTag" class="todo-content-scroll-area"  @ps-scroll-y="scrollHanle" :settings="settings" :key="$vs.rtl" ref="taskListPS">
                <transition-group class="todo-list" name="list-enter-up" tag="ul"  appear v-if="rates != null">
                    <li
                      class="cursor-pointer todo_todo-item"
                      v-for="(rate, index) in rates"
                      :key="String(currFilter) + 'r' + String(rate.id)"
                      :style="[{transitionDelay: (index * 0.1) + 's'}]">
                      <rate-task :rateId="rate.id"  :key="String(rate.id) + String(rate.create_date)" />
                    </li>
                </transition-group>
                <div v-if="rates.data===null">Chưa có đánh giá</div>
              </vue-perfect-scrollbar>

            <!-- </component> -->
            <!-- /TODO LIST -->

        </div>
    </div>
</template>

<script>
import moduleRate from "@/store/rate/rateStore.js";
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import ruleFilter from './ruleFilter.vue'
import rateTask from './rateTask.vue'
import ruleAddNew from './components/ruleAddNew.vue'
import ruleDetail from './components/ruleDetail'

export default {
  data () {
    return {
      page: 1,
      size: 10,
      currFilter           : '',
      clickNotClose        : true,
      displayPrompt        : false,
      taskIdToEdit         : 0,
      isSidebarActive      : true,
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
    windowWidth () {
      this.setSidebarWidth
    },

    ruleFilter(){

      this.toggleTodoSidebar()

      // Fetch rates
      this.page = 1
      const payload = {
      "ruleId": this.$route.params.ruleId,
      "item_per_page": this.size,
      "page_number": this.page
      }
      this.$store.dispatch("rate/getRatesByRule", payload);
      const scroll_el = this.$refs.taskListPS.$el || this.$refs.taskListPS
      scroll_el.scrollTop = 0

    },

  },
  computed: {
    rates(){ return this.$store.getters["rate/getRates"] },
    scrollbarTag () { return this.$store.getters.scrollbarTag },
    windowWidth ()  { return this.$store.state.windowWidth },
    ruleFilter () { return this.$route.params.ruleId },
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
        this.$store.dispatch("rate/scrollRates", payload);

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
    ruleFilter,
    rateTask,
    ruleAddNew,
    ruleDetail
  },
  created() {
    this.setSidebarWidth()
    this.$store.registerModule("rate", moduleRate);

    this.page = 1
    const payload = {
      "ruleId": this.$route.params.ruleId,
      "item_per_page": this.size,
      "page_number": this.page
    }

    this.$store.dispatch("rate/getRatesByRule", payload);

  },
  beforeUpdate () {
    this.currFilter = this.$route.params.ruleId
  },
  beforeDestroy() {
    this.$store.unregisterModule("rate");

  },
};
</script>
<style lang="scss">
@import "@/assets/scss/vuexy/apps/todo.scss";

</style>
