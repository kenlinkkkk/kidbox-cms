<template>
  <div class="w-full">
    <vx-card title="Tổng điểm" class="m-2">
      <h2 class="text-danger">{{ TotalPoint }}</h2>
    </vx-card>

    <vx-card class="m-2" v-for="(item, index) in Achievements" :key="index">
      <div class="flex">
        <div class="justify-items-center">
          <img :src="item.image_url.path" class="w-14" v-if="item.image_url">
          <feather-icon v-else icon="AwardIcon" svgClasses="w-12 h-12 text-warning"></feather-icon>
        </div>
        <div class="ml-2">
          <h5 class="text-success">{{ item.name }}</h5>
          <p>Điểm cộng: {{ item.point}}</p>
          <p v-if="item.note">Ghi chú: {{ item.note }}</p>
        </div>
      </div>
    </vx-card>
  </div>
</template>

<script>
export default {
  name: "AchievementList",
  data () {
    return {
      configLoadPage: {
        child_id: Number.parseInt(this.$route.params.childId),
        page: 1,
        limit: 4
      }
    }
  },
  computed: {
    Achievements () {
      return this.$store.getters['child/getListAchievement']
    },
    TotalPoint () {
      return this.$store.getters['child/getTotalPoint']
    }
  },
  created() {
    this.$store.dispatch('child/getAllAchievement', this.configLoadPage)
  }
}
</script>

<style scoped>

</style>
