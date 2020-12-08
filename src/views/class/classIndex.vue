<template>
  <div class="vx-row">
    <div class="vx-col w-full md:w-1/4 mb-base inline-flex" v-for="(item, index) in listClasses" :key="String(item.id) + String(item.name) + String(index)">
      <class-item :classId="item.id" :key="String(item.id) + String(index)" @showDisplayPrompt="showDisplayPrompt($event)"/>
    </div>
    <class-info :displayPrompt="displayPrompt" :classId="classIdToEdit" @hiddenDisplayPrompt="hiddenPrompt" v-if="displayPrompt"/>
    <div class="vx-col w-full md:w-1/4 mb-base inline-flex">
      <class-add-new :schoolId="getSchoolId()"/>
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
      }
    },
    components: {
      ClassItem, ClassInfo, ClassAddNew
    },
    computed: {
      listClasses() {
        return this.$store.getters['class/getClasses'];
      }
    },
    methods: {
      showDisplayPrompt(classId) {
        this.classIdToEdit = classId;
        this.displayPrompt = true;
      },
      hiddenPrompt() {
        this.displayPrompt = false;
      },
      getSchoolId() {
        let data = this.$route.params;
        return Number.parseInt(data.schoolId)
      }
    },
    created() {
      this.$store.registerModule('class', moduleClass);
      let schoolId;
      if (this.$route.query) {
        schoolId = {
          schoolId: this.$route.query.c
        }
      } else {
        schoolId = {
          schoolId : this.$store.state.AppActiveUser.schoolId
        };
      }
      if (schoolId.schoolId) {
        this.$store.dispatch('class/getClassBySchoolId', schoolId);
      }
    },
    beforeDestroy() {
      this.$store.unregisterModule('class');
    }
  }
</script>
