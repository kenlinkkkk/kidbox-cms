<template>
  <ul class="vx-timeline">
    <li v-for="item in data" :key="item.id">
      <div class="timeline-icon bg-primary">
        <feather-icon icon="CheckIcon" svgClasses="text-white stroke-current w-5 h-5" />
      </div>
      <div class="timeline-info">
        <p class="font-semibold">{{ item.name }} - {{ item.start_time }} - {{ item.end_time }}</p>
        <span class="activity-desc">Vị trí: {{ item.location }}</span>
        <br>
        <span class="activity-desc">Ghi chú: {{ item.note }}</span>
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "kidbox-schedule-timeline",
    props: {
      data: {
        type: Array,
        required: false
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/scss/vuexy/components/vxTimeline.scss";
</style>
