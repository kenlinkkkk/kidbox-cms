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
        <vs-button
          color="success"
          type="filled"
          size="small"
          icon-pack="feather"
          icon="icon-check"
          class="ml-2 btn-custom__min-width"
          :disabled="studentDetail.is_checkin !== 0"
          @click="checkinClick"
        >
          {{ studentDetail.is_checkin === 0 ? 'Checkin' : studentDetail.time_checkin }}
        </vs-button>
        <vs-button
          color="warning"
          type="filled"
          size="small"
          icon-pack="feather"
          icon="icon-slash"
          class="ml-2 btn-custom__min-width"
          :disabled="studentDetail.is_checkout !== 0"
          @click="checkoutClick"
        >
          {{ studentDetail.is_checkout === 0 ? 'Checkout' : studentDetail.time_checkout }}
        </vs-button>
        <div class="badge-noti ml-2">
          <vs-button radius size="small" color="danger" type="filled" icon-pack="feather" icon="icon-plus-square" @click="medicineNote" :disabled="studentDetail.medicine === null" />
          <div class="content-noti-badge" v-if="studentDetail.medicine !== null"/>
        </div>
        <vs-button radius size="small" color="rgba(0, 126, 255, 1)" type="filled" icon-pack="feather" icon="icon-list" @click="teacherNote()" class="ml-2"/>
      </div>
    </div>
    <vs-prompt
      :active.sync="medicinePrompt.showMedicinePrompt"
      :title="medicinePrompt.title"
      buttonAccept="false"
      cancel-color="primary"
      cancel-text= "Đóng"
    >
      <div class="con-exemple-prompt" v-if="studentDetail.medicine !== null">
        <p>Tình trạng: {{ studentDetail.medicine.health_condition }}</p>
        <p>Thuốc: {{ studentDetail.medicine.medicine }}</p>
      </div>
    </vs-prompt>

    <vs-prompt
      :active.sync="teacherNotePrompt.active"
      :title="teacherNotePrompt.title"
      accept-text="Lưu"
      @accept="addTeacherNote"
      cancel-color="primary"
      cancel-text= "Đóng"
    >
      <div class="con-exemple-prompt">
        <vs-input placeholder="Ghi chú" v-model="teacherNotePrompt.val" class="mt-4 mb-2 w-full" />
      </div>
    </vs-prompt>
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
  .btn-custom__min-width {
    min-width: 110px;
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
        medicinePrompt: {
          showMedicinePrompt: false,
          title: ''
        },
        teacherNotePrompt: {
          active: false,
          title: "Ghi chú giáo viên",
          val: ''
        },
      }
    },
    computed: {
      studentDetail () {
        return this.$store.getters["class/getStudentInfoById"](this.studentId)
      }
    },
    methods: {
      checkinClick() {
        let payload = {
          child_id: this.studentId,
          date: new Date().toISOString().split('T')[0],
          is_checkin: 1
        }

        this.$store.dispatch('class/updateCheckin', payload).then((response) => {
          if (response.data.code === 200) {
            this.$vs.notify({
              title:'Điểm danh thành công',
              text: response.data.message,
              position: 'top-right',
              color:'success',
              iconPack: 'feather',
              icon:'icon-check'
            });
          } else {
            this.$vs.notify({
              title:'Lỗi',
              text: response.data.message,
              position: 'top-right',
              color:'danger',
              iconPack: 'feather',
              icon:'icon-x'
            });
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      checkoutClick() {
        let payload = {
          child_id: this.studentId,
          date: new Date().toISOString().split('T')[0],
          is_checkout: 1
        }

        this.$store.dispatch('class/updateCheckin', payload).then((response) => {
          if (response.data.code === 200) {
            this.$vs.notify({
              title:'Điểm danh thành công',
              text: response.data.message,
              position: 'top-right',
              color:'success',
              iconPack: 'feather',
              icon:'icon-check'
            });
          } else {
            this.$vs.notify({
              title:'Lỗi',
              text: response.data.message,
              position: 'top-right',
              color:'danger',
              iconPack: 'feather',
              icon:'icon-x'
            });
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      addTeacherNote () {
        let payload = {
          child_id: this.studentId,
          date: new Date().toISOString().split('T')[0],
          note_of_teacher: this.teacherNotePrompt.val
        }

        this.$store.dispatch('class/updateCheckin', payload).then((response) => {
          if (response.data.code === 200) {
            this.$vs.notify({
              title:'Điểm danh thành công',
              text: response.data.message,
              position: 'top-right',
              color:'success',
              iconPack: 'feather',
              icon:'icon-check'
            });
          } else {
            this.$vs.notify({
              title:'Lỗi',
              text: response.data.message,
              position: 'top-right',
              color:'danger',
              iconPack: 'feather',
              icon:'icon-x'
            });
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      medicineNote () {
        this.medicinePrompt.showMedicinePrompt = true
        this.medicinePrompt.title = "Nhắc thuốc bé " + this.studentDetail.child.name
      },
      teacherNote () {
        this.teacherNotePrompt.active = true
      }
    }
  }
</script>


