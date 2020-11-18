<template>
  <div class="vx-row">
    <div class="vx-col w-full md:w-1/4 mb-base inline-flex" v-for="(item, index) in listClasses" :key="String(item.id) + String(item.name) + String(index)">
      <class-item :classId="item.id" :key="String(item.id) + String(index)" @showDisplayPrompt="showDisplayPrompt($event)"/>
    </div>
    <class-info :displayPrompt="displayPrompt" :classId="classIdToEdit" @hiddenDisplayPrompt="hiddenPrompt" v-if="displayPrompt"/>
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
  export default {
    data() {
      return {
        displayPrompt: false,
        classIdToEdit: 0,
      }
    },
    components: {
      ClassItem, ClassInfo
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
      }
    },
    created() {
      this.$store.registerModule('class', moduleClass);
      this.$store.dispatch('class/getClassBySchoolId', this.$route.params);
    },
    beforeDestroy() {
      this.$store.unregisterModule('class');
    }
  }
</script>
