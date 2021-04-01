<template>
  <vs-card>
    <class-tabs />
  </vs-card>
</template>

<script>
  import moduleClass from '@/store/class/classStore.js'
  import ClassTabs from "./components/ClassTabs";

  export default {
    data () {
      return {
        configLoadPage: {
          limit: 10,
          page: 1,
          default: "f"
        },
      }
    },
    components: {
      ClassTabs
    },
    computed: {
      listClasses () {
        return this.$store.getters['class/getClasses'];
      }
    },
    created() {
      this.$store.registerModule('class', moduleClass);
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

<style scoped>

</style>
