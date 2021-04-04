<template>
  <div class="px-4 py-4 list-item-component">
    <div class="vx-row">
      <div class="vx-col w-full sm:w-1/2 flex sm:items-center sm:flex-row flex-col">
        <img :src="studentDetail.child.image_url.path" class="w-16 rounded"/>
        <div class="ml-2">
          <p>{{ studentDetail.child.name }}</p>
          <p v-if="studentDetail.note_of_teacher"><small class="text-danger">Ghi chú của giáo viên: {{ studentDetail.note_of_teacher }}</small></p>
          <p v-if="studentDetail.note_of_parent"><small class="text-success">Ghi chú của phụ huynh: {{ studentDetail.note_of_parent }}</small></p>
        </div>
      </div>
      <div class="vx-col w-full sm:w-1/2 m-auto flex sm:justify-end">
        <div>
          <vs-chip color="success" @click="checkinClick">
            <vs-avatar icon-pack="feather" icon="icon-check" />
            <span>{{ studentDetail.is_checkin === 0 ? 'Checkin' : studentDetail.time_checkin }}</span>
          </vs-chip>
          <vs-chip color="warning" @click="checkoutClick">
            <vs-avatar icon-pack="feather" icon="icon-slash" />
            <span>{{ studentDetail.is_checkout === 0 ? 'Checkin' : studentDetail.time_checkout }}</span>
          </vs-chip>
        </div>
        <div class="badge-noti mr-2">
          <vs-button radius size="small" color="danger" type="filled" icon-pack="feather" icon="icon-plus-square" @click="medicineNote" :disabled="studentDetail.medicine === null" />
          <div class="content-noti-badge" v-if="studentDetail.medicine !== null"/>
        </div>
        <vs-button radius size="small" color="rgba(0, 126, 255, 1)" type="filled" icon-pack="feather" icon="icon-list" @click="checkinClick"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .badge-noti{
    position: relative;
    .content-noti-badge {
      width: 12px;
      height: 12px;
      position: absolute;
      background-color: #EA5455;
      border: 1px solid white;
      border-radius: 50%;
      right: -3px;
      top: -3px;
    }
  }
</style>

<script>
  export default {
    props: {
      studentId: {
        type : Number,
        required: true
      }
    },
    data () {
      return {
        studentDetail: this.$store.getters["class/getStudentInfoById"](this.studentId)
      }
    },
    methods: {
      checkinClick() {
        console.log("Checkin" + this.studentId)
      },
      checkoutClick() {
        console.log("Checkout" + this.studentId)
      },
      medicineNote () {
        console.log("medicine" + this.studentId)
      }
    }
  }
</script>


