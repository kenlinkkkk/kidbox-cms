<template>
  <vs-tabs color="rgb(32, 201, 192)">
    <div v-for="(item, index) in listClass" :key="index">
      <vs-tab :label="'Lớp: ' + item.name">
        <vs-tabs position="left" color="danger">
          <vs-tab label="Thông tin lớp">
            <vs-card>
              <div class="vx-row">
                <div class="vx-col w-full flex">
                  <vs-avatar size="100px" :src="item.logoUrl.path" class="logo-custom"/>
                </div>
                <div class="p-2 w-full text-center">
                  <h4 class="mb-2">Lớp: {{ item.name }}</h4>

                  <div class="flex justify-around">
                    <div class="flex">
                      <feather-icon icon="MapPinIcon" svgClasses="h-5 w-5 text-grey" class="block" />
                      <p class="ml-2">Phòng học: {{ item.room }}</p>
                    </div>
                    <div class="flex">
                      <feather-icon icon="UsersIcon" svgClasses="h-5 w-5 text-grey" class="block" />
                      <p class="ml-2">Sĩ số: {{ item.number_of_student }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </vs-card>
          </vs-tab>
          <vs-tab label="Danh sách học sinh">
            <child-list :classId="item.id" />
          </vs-tab>
        </vs-tabs>
      </vs-tab>
    </div>
  </vs-tabs>
</template>

<script>
  import ChildList from "./ChildList";

  export default {
    data () {
      return {
        classLocal: ''
      }
    },
    components: {
      ChildList
    },
    computed: {
      listClass () {
        console.log('I change when this.property changes.')
        return this.classLocal
      }
    },
    created() {
      this.classLocal = this.$store.getters['class/getClasses']
    }
  }
</script>

<style scoped>
  .logo-custom {
    left: 50%;
    transform: translate(-50%);
    background: rgba(255, 255, 255, 0) !important;
  }
</style>
