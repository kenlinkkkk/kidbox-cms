<template>
  <div class="todo__filters-container">
    <vs-divider></vs-divider>
    <div class="px-6 py-4" v-if="typeList.length > 0">
      <vue-perfect-scrollbar :is="scrollbarTag" :key="$vs.rtl" :settings="settings"
                             @ps-scroll-y="scrollHanle" class="rule-scroll-area todo-scroll-area">
        <template v-for="item in typeList">
          <router-link :class="{'text-primary': typeFilter === item.id}" :key=item.id
                       :to="`${baseUrl}/${item.id}`" class="flex justify-between mt-6 cursor-pointer" tag="span">
            <span class="text-lg ml-3 text-rule-overflow" v-if="item.status === 1">{{ item.name }}</span>
            <span class="line-through text-lg ml-3 text-rule-overflow" v-if="item.status === 0">{{ item.name }}</span>
            <vs-dropdown class="button-height">
              <a class="flex self-start" href="#">
                <i class="material-icons"> more_vert </i>
              </a>
              <vs-dropdown-menu>
                <vs-dropdown-item :infrastructureTypeId="item.id" @click="displayTypePrompt(item.id)">Chi tiết</vs-dropdown-item>
                <vs-dropdown-item :infrastructureTypeId="item.id" @click="deactiveInfrastructureType(item.id)">Xóa</vs-dropdown-item>
              </vs-dropdown-menu>
            </vs-dropdown>
          </router-link>
          <type-detail-prompt
            :activeInfrastructureTypePrompt="displayInfrastructurePrompt"
            :typeId="item.id" :key="item.id + '-' + item.id"
            @hiddenTypePrompt="hiddenTypePrompt"></type-detail-prompt>
        </template>
      </vue-perfect-scrollbar>
    </div>
    <div class="px-6 py-4" v-else>
      <p>Chưa có bản ghi</p>
    </div>
  </div>
</template>
<script>
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'
  import TypeDetailPrompt from "./TypeDetailPrompt";

  export default {
    props: {
      infrastructureTypeId: {
        type: Number
      }
    },
    data() {
      return {
        InfrastructureTypeId: 0,
        displayInfrastructurePrompt: false,
        page: 1,
        settings: {
          maxScrollbarLength: 60,
          wheelSpeed: 0.30,
          suppressScrollY: false,
          suppressScrollX: false,
          wheelPropagation: false
        }
      }
    },
    computed: {
      typeList() {
        return this.$store.getters["infrastructure/getListInfrastructureType"];
      },
      typeFilter() {
        return this.$route.params.infrastructureTypeId;
      },
      baseUrl() {
        const path = this.$route.path
        return path.slice(0, path.lastIndexOf('/'))
      },
      scrollbarTag() {
        return this.$store.getters.scrollbarTag
      },
    },
    methods: {
      scrollHanle({target: {scrollTop, clientHeight, scrollHeight}}) {
        if (scrollTop + clientHeight >= scrollHeight) {
          this.page += 1;
          let payload = {
            page: this.page,
            limit: 10,
            schoolId: localStorage.getItem('schoolId')
          }

          this.$store.dispatch("infrastructure/infrastructureTypeList", payload)
        }
      },
      displayTypePrompt(infrastructureTypeId) {
        this.infrastructureTypeId = infrastructureTypeId;
        this.displayInfrastructurePrompt = true;
      },
      hiddenTypePrompt() {
        this.displayInfrastructurePrompt = false;
      },
      deactiveInfrastructureType(infrastructureTypeId) {
        this.$store.dispatch("infrastructure/infrastructureTypeDelete", {id: infrastructureTypeId}).then((response) => {
          this.$vs.notify({
            title: 'Xóa thành công',
            text: response.data.message,
            position: 'top-right',
            color: 'success',
            iconPack: 'feather',
            icon: 'icon-check'
          }).catch((error) => {
            this.$vs.notify({
              title: 'Xóa thành công',
              text: error.message,
              position: 'top-right',
              color: 'success',
              iconPack: 'feather',
              icon: 'icon-check'
            })
          });
        })
      }
    },
    created() {
      this.$store.dispatch("infrastructure/infrastructureTypeList", {page: this.page, limit: 10});
    },
    components: {
      VuePerfectScrollbar,
      TypeDetailPrompt
    }
  }
</script>

<style lang="scss">
  .rule-scroll-area {
    height: 250px !important;
  }

  .text-rule-overflow {
    white-space: nowrap;
    width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
