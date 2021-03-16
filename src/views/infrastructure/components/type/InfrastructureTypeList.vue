<template>
  <div class="todo__filters-container">
    <vs-divider></vs-divider>
    <div class="px-6 py-4" v-if="typeList.length > 0">
      <vue-perfect-scrollbar :is="scrollbarTag" :key="$vs.rtl" :settings="settings"
                             @ps-scroll-y="scrollHanle" class="rule-scroll-area todo-scroll-area">
        <template v-for="item in typeList">
          <div class="vx-row mb-6" :key="'container-' + item.id">
            <router-link :class="[{'text-primary': typeFilter === item.id}, 'ml-4']" :key=item.id
                         :to="`${baseUrl}/${item.id}`" class="flex justify-between cursor-pointer" tag="span">
              <span class="text-lg text-rule-overflow" v-if="item.status === 1">{{ item.name }}</span>
              <span class="line-through text-lg text-rule-overflow" v-if="item.status === 0">{{ item.name }}</span>
            </router-link>
            <div class="vx-col w-full sm:w-1/6 ml-auto flex sm:justify-end">
              <feather-icon
                icon="EditIcon"
                class="cursor-pointer text-primary"
                :svgClasses="['w-5', 'h-5 mr-4']"
                @click="displayTypePrompt(item.id)" />
              <feather-icon
                icon="TrashIcon"
                class="cursor-pointer text-primary"
                svgClasses="w-5 h-5"
                @click="deactiveInfrastructureType(item.id)" />
            </div>
          </div>
        </template>
      </vue-perfect-scrollbar>
      <type-detail-prompt
        :activeInfrastructureTypeDetailPrompt="displayInfrastructureTypeDetailPrompt"
        :typeId="infrastructureTypeDetailId"
        @hiddenTypePrompt="hiddenTypePrompt"
        v-if="displayInfrastructureTypeDetailPrompt"/>
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
    data() {
      return {
        infrastructureTypeDetailId: 0,
        displayInfrastructureTypeDetailPrompt: false,
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
        return this.$route.params.infrastructureTypeDetailId;
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
        this.infrastructureTypeDetailId = infrastructureTypeId;
        this.displayInfrastructureTypeDetailPrompt = true;
      },
      hiddenTypePrompt() {
        this.displayInfrastructureTypeDetailPrompt = false;
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
    height: 100vh !important;
  }

  .text-rule-overflow {
    white-space: nowrap;
    width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
