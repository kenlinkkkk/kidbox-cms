<template>
  <div class="vx-row">
    <div class="vx-col w-full md:w-1/4 mb-base inline-flex" v-for="(item, index) in listClasses" :key="String(item.id) + String(item.name) + String(index)">
      <class-item :classId="item.id" :key="String(item.id) + String(index)" @showDisplayPrompt="showDisplayPrompt($event)"/>
    </div>
    <class-info :displayPrompt="displayPrompt" :classId="classIdToEdit" @hiddenDisplayPrompt="hiddenPrompt" v-if="displayPrompt"/>
    <div class="vx-col w-full md:w-1/4 mb-base inline-flex">
      <class-add-new :schoolId="getSchoolId"/>
    </div>
  </div>
</template>
<style lang="scss">
  .button-height {
    height: 10px;
  }
</style>
<script>
  import moduleClass from '@/store/class/classStore.js'
  import ClassItem from './components/classItem'
  import ClassInfo from './components/classInfo'
  import ClassAddNew from './components/classAddNew'

  export default {
    data() {
      return {
        displayPrompt: false,
        classIdToEdit: 0,
        classStatus: 1,
        configLoadPage: {
          limit: 10,
          page: 1,
          default: "f"
        }
      }
    },
    components: {
      ClassItem, ClassInfo, ClassAddNew
    },
    computed: {
      listClasses() {
        return this.$store.getters['class/getClasses'];
      },
      getSchoolId() {
        let data = this.$route.params;
        if (data.schoolId) {
          return Number.parseInt(data.schoolId)
        } else {
          return this.$store.state.AppActiveUser.schoolId
        }
      }
    },
    methods: {
      showDisplayPrompt(classId) {
        this.classIdToEdit = classId;
        this.displayPrompt = true;
      },
      hiddenPrompt() {
        this.displayPrompt = false;
      }
    },
    created() {
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
    beforeDestroy() {
      this.$store.unregisterModule('class');
    }
  }
</script>
