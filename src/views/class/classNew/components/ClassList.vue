<template>
  <div class="todo__filters-container">
    <div class="px-6 py-4" v-if="classList.length > 0">
      <vue-perfect-scrollbar :is="scrollbarTag" :key="$vs.rtl" :settings="settings"
                             @ps-scroll-y="scrollHanle" class="rule-scroll-area todo-scroll-area">
        <template v-for="item in classList">
          <div class="vx-row mb-6" :key="'container-' + item.id">
            <router-link :class="[{'text-primary': Number(classFilter) === item.id}, 'ml-4']" :key=item.id
                         :to="`${baseUrl}/${item.id}`" class="flex justify-between cursor-pointer" tag="span">
              <vs-avatar size="50px" :src="item.logoUrl.path" />
              <span class="text-lg text-rule-overflow mt-2">
                <p :class="[{'text-primary': Number(classFilter) === item.id}]">{{ item.name }}</p>
                <small>Sĩ số: {{ item.number_of_student }}</small>
              </span>
            </router-link>
          </div>
        </template>
      </vue-perfect-scrollbar>
    </div>
    <div class="px-6 py-4">
      <p>Chưa có bản ghi</p>
    </div>
  </div>
</template>

<script>
  import VuePerfectScrollbar from "vue-perfect-scrollbar";

  export default {
    data() {
      return {
        configLoadPage: {
          limit: 10,
          page: 1,
          default: "f",
          schoolId: this.$store.state.AppActiveUser.schoolId
        },
        settings: {
          maxScrollbarLength: 60,
          wheelSpeed: 0.30,
          suppressScrollY: false,
          suppressScrollX: false,
          wheelPropagation: false
        }
      }
    },
    computed: {
      classList() {
        return this.$store.getters['class/getClasses'];
      },
      classFilter() {
        return this.$route.params.classId;
      },
      baseUrl() {
        const path = this.$route.path
        return path.slice(0, path.lastIndexOf('/'))
      },
      scrollbarTag() {
        return this.$store.getters.scrollbarTag
      },
    },
    methods: {
      scrollHanle({target: {scrollTop, clientHeight, scrollHeight}}) {
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
    },
    components: {
      VuePerfectScrollbar,
    },
    created() {
      if (this.$acl.check('Teacher')) {
        Object.assign(this.configLoadPage, { id_teacher: this.$store.state.AppActiveUser.uid})
      }

      if (this.$route.query.c) {
        this.$store.dispatch('class/getClassBySchoolId', { schoolId: this.$route.query.c, ...this.configLoadPage});
      } else {
        this.$store.dispatch('class/getClassBySchoolId', this.configLoadPage);
      }
    }
  }
</script>

<style lang="scss">
  .rule-scroll-area {
    height: 100vh !important;
  }

  .text-rule-overflow {
    white-space: nowrap;
    width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
