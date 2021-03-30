<template>
  <div class="vx-row">
    <div class="vx-col w-full md:w-1/3 mb-base inline-flex flex-wrap" v-for="(school, index) in schools" :key="String(school.id) + String(school.name) + String(index)">
      <school-item :schoolId="school.id" :key="String(school.id) + String(index)" @showDisplayPrompt="showDisplayPrompt($event)"/>
    </div>
    <school-info :displayPrompt="displayPrompt" :schoolId="schoolIdToEdit" @hiddenDisplayPrompt="hiddenPrompt" v-if="displayPrompt"/>
    <div class="vx-col w-full md:w-1/3 mb-base inline-flex">
      <school-add-new v-if="$acl.check('Admin')"/>
    </div>
  </div>
</template>
<style>
  .button-height {
    height: 10px;
  }
</style>
<script>
  import moduleSchool from '@/store/school/schoolStore.js'
  import { VueContext } from 'vue-context'
  import SchoolInfo from './components/schoolInfo.vue'
  import SchoolItem from './SchoolItem.vue';
  import SchoolAddNew from './components/schoolAddNew.vue'
  import moduleSubPackage from '@/store/subpackage/subPackageStore.js'

  export default {
    data() {
      return {
        displayPrompt: false,
        schoolIdToEdit: 0,
        configLoadPage: {
          page: 1,
          limit: 10,
        }
      }
    },
    computed: {
      activeUserInfo() {
        return this.$store.state.AppActiveUser
      },
      schools() {
        return this.$store.getters['school/getSchools'];
      }
    },
    methods: {
      showDisplayPrompt(schoolId) {
        this.schoolIdToEdit = schoolId;
        this.displayPrompt = true;
      },
      hiddenPrompt() {
        this.displayPrompt = false;
      }
    },
    components: {
      VueContext,
      SchoolInfo,SchoolItem,SchoolAddNew
    },
    created() {
      this.$store.registerModule('school', moduleSchool);
      if (this.$acl.check('Admin')) {
        this.$store.dispatch('school/getListSchool', this.configLoadPage);
      } else if (this.$acl.check('Master')) {
        this.$store.dispatch('school/getSchoolById', { schoolId: this.$store.state.AppActiveUser.schoolId });
      }
      if (!moduleSubPackage.isRegistered) {
        this.$store.registerModule('subpackage', moduleSubPackage)
        moduleSubPackage.isRegistered = true
      }
      this.$store.dispatch('subpackage/getListSubPackages', this.configLoadPage)
    },
    beforeDestroy() {
      this.$store.unregisterModule('school')
    }
  }
</script>
