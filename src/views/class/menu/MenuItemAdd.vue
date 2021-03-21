<template>
  <div>
    <div v-for="(item, index)  in menuList" :key="item.id" class="vx-row repeater-form m-2">
      <div class="w-1/3 p-2">
        <div class="flex items-start flex-col sm:flex-row">
          <img :src="item.image_url.path" class="mr-8 rounded w-24 h-24 border border-primary" />
          <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
          <div>
            <input type="file" class="hidden" :id="'file-'+ index" @change="update_avatar" accept="image/*">
            <!-- Toggle comment of below buttons as one for actual flow & currently shown is only for demo -->
            <vs-button type="border" class="mt-6" @click="uploadClick(index)">Thêm ảnh</vs-button>
          </div>
        </div>
      </div>
      <div class="w-1/4 p-2">
        <vs-input type="text" name="name" label="Tên món" v-model="item.name" class="w-full"/>
      </div>
      <div class="w-1/4 p-2">
        <label>Giờ ăn</label>
        <flat-pickr :config="configdateTimePicker" v-model="item.time" label="Giờ ăn" class="w-full"/>
      </div>
      <div class="w-1/6 p-2 mt-6">
        <vs-button type="border" color="danger" icon-pack="feather" icon="icon-x" class="m-auto" @click="deleteNode(index)">Xóa</vs-button>
      </div>
      <vs-divider/>
    </div>
    <div class="vx-row p-2 m-2">
      <div class="w-1/2">
        <vs-button type="border" color="success" icon-pack="feather" icon="icon-plus" @click="actionAddItem">Thêm</vs-button>
      </div>
      <div class="w-1/2 flex flex-row-reverse">
        <vs-button @click="submitForm">Lưu thông tin</vs-button>
      </div>
    </div>
  </div>
</template>

<script>
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';
  import axiosApiInstance from "../../../axios";

  export default {
    components: {
      flatPickr
    },
    data () {
      return {
        nextItemId: 1,
        menuList: [
          {
            id: 1,
            name: "",
            time: "",
            image_url: {
              path: "https://kidbox.vn/media/default/no-image.png",
              type: "png"
            }
          }
        ],
        configdateTimePicker: {
          enableTime: true,
          enableSeconds: false,
          noCalendar: true
        }
      }
    },
    methods: {
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
            this.menuList[index].image_url.path = 'https://kidbox.vn/media/' + response.data.data.path;
            this.menuList[index].image_url.type = response.data.data.type;
          }).catch((error) => {
            console.log(error)
          })
        }
      },
      uploadClick (id) {
        let name = 'file-' + id;
        document.getElementById(name).click();
      },
      actionAddItem () {
        this.nextItemId += 1;
        this.menuList.push({
          id: this.nextItemId,
          name: "",
          time: "",
          image_url: {
            path: "https://kidbox.vn/media/default/no-image.png",
            type: "png"
          }
        })
      },
      deleteNode (idNode) {
        this.menuList.splice(idNode, 1)
      },
      submitForm () {
        console.log(this.menuList)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .repeater-form {
    overflow: hidden;
    transition: .35s height;
  }
</style>
