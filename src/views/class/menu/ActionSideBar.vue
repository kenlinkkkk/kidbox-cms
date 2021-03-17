<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>{{ this.data.id === undefined ? "THÊM MỚI" : "CẬP NHẬT" }} THỰC ĐƠN</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">
      <div class="p-4">
        <template>
          <div>
            <vx-card v-for="(item, index) in dataList" :key="index" :id="index" class="mt-2" title="Món ăn" remove-card-action collapse-action>
              <div class="vx-row">
                <div class="vx-col w-full">
                  <div class="flex items-start flex-col sm:flex-row">
                    <img :src="item.image_url.path" class="mr-8 rounded w-24" />
                    <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
                    <div>
                      <input type="file" class="hidden" :id="'file-'+ index" @change="update_avatar" accept="image/*">
                      <!-- Toggle comment of below buttons as one for actual flow & currently shown is only for demo -->
                      <vs-button type="border" class="mr-4" @click="uploadClick(index)">Thêm ảnh món ăn</vs-button>
                    </div>
                  </div>
                </div>
              </div>
              <vs-input class="w-full mt-4" label="Tên món ăn" v-model="item.name" name="name" />
              <label class="mt-4">Chọn giờ</label>
              <flat-pickr :config="configdateTimePicker" v-model="item.time" class="w-full"/>
            </vx-card>
            <vs-button class="mt-2" @click="repeatForm">Thêm</vs-button>
          </div>
        </template>
      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-input class="w-full mb-4" label="Ghi chú" v-model="note" name="note" />
      <vs-button class="mr-6" @click="submitData">Lưu</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Hủy</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';
  import axiosApiInstance from "../../../axios";

  export default {
    props: {
      isSidebarActive: {
        type: Boolean,
        required: true
      },
      data: {
        type: Object,
        default: () => {}
      }
    },
    components: {
      VuePerfectScrollbar,
      flatPickr
    },
    data () {
      return {
        settings: {
          maxScrollbarLength: 60,
          wheelSpeed: .20
        },
        nextItem: 2,
        dataList: [{
          name: "",
          image_url: {
            path: "",
            type: ""
          },
          time: ""
        }],
        note: "",
        configdateTimePicker: {
          enableTime: true,
          enableSeconds: false,
          noCalendar: true
        }
      }
    },
    watch: {
      isSidebarActive (val) {
        if (!val) return
        if (this.data.id !== 0) {
          this.initValues()
          this.$validator.reset()
        } else if(this.data.id === 0) {
          this.dataList = [{
            name: "",
            image_url: {
              path: "",
              type: ""
            },
            time: ""
          }]
        }
      }
    },
    computed: {
      isSidebarActiveLocal: {
        get () {
          return this.isSidebarActive
        },
        set (val) {
          if (!val) {
            this.$emit('closeSidebar')
          }
        }
      },
      isFormValid () {
        return !this.errors.any() && this.dataName && this.dataCategory && this.dataPrice > 0
      },
      scrollbarTag () { return this.$store.getters.scrollbarTag }
    },
    methods: {
      initValues () {
        if (this.data.id !== undefined) {
          let inputQuery = {
            classId: this.data.class_room_id,
            date: this.data.date
          }
          this.$store.dispatch('menu/getMenuByDate', inputQuery).then((response) => {
            this.dataList = JSON.parse(JSON.stringify(response.data.data.menu))
          }).catch((error) => {
            console.log(error)
          })
        }
      },
      async submitData () {
        let submitData = {
          class_room_id: this.data.class_room_id,
          date: this.data.date.toISOString().split('T')[0],
          data: this.dataList,
          note: this.note
        }
        let response;
        if (this.data.id === 0) {
          // eslint-disable-next-line no-const-assign
          response = await this.$store.dispatch('menu/addMenu', submitData)
        } else {
          // eslint-disable-next-line no-const-assign
          response = await this.$store.dispatch('menu/updateMenu', { id: this.data.id, submitData: submitData})
        }

        if (response.data.code === 200) {
          this.isSidebarActiveLocal = false
          this.$vs.notify({
            title:'Cập nhật thông tin hành công',
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
      },
      repeatForm () {
        this.dataList.push({
          name: "",
          image_url: {
            path: "",
            type: ""
          },
          time: ""
        })
      },
      update_avatar (input) {
        let index = input.target.id.split('-')[1];
        let formData = new FormData();
        if (input.target.files && input.target.files[0]) {
          let file = input.target.files[0];
          formData.append('file', file);

          let config = {
            url: "/api/upload",
            method: "POST",
            headers: {
              'Content-Type' : 'multipart/form-data'
            },
            data: formData
          }
          axiosApiInstance(config).then((response) => {
            this.dataList[index].image_url.path = 'https://kidbox.vn/media/' + response.data.data.path;
            this.dataList[index].image_url.type = response.data.data.type;
          }).catch((error) => {
            console.log(error)
          })
        }
      },
      uploadClick (id) {
        let name = 'file-' + id;
        document.getElementById(name).click();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .add-new-data-sidebar {
    ::v-deep .vs-sidebar--background {
      z-index: 52010;
    }

    ::v-deep .vs-sidebar {
      z-index: 52010;
      width: 400px;
      max-width: 90vw;

      .img-upload {
        margin-top: 2rem;

        .con-img-upload {
          padding: 0;
        }

        .con-input-upload {
          width: 100%;
          margin: 0;
        }
      }
    }
  }

  .scroll-area--data-list-add-new {
    // height: calc(var(--vh, 1vh) * 100 - 4.3rem);
    height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 170px);

    &:not(.ps) {
      overflow-y: auto;
    }
  }
</style>
