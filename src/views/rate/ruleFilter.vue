<!-- =========================================================================================
    File Name: TodoAddNew.vue
    Description: Add new todo component
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="todo__filters-container">

    <!-- all -->
    <div class="px-6 py-4">
      <router-link :class="{'text-primary': ruleFilter === 'all'}" :to="`${baseUrl}/all`" class="flex cursor-pointer"
                   tag="span">
        <feather-icon :svgClasses="[{'text-primary stroke-current': ruleFilter === 'all'}, 'h-6 w-6']"
                      icon="LayersIcon"></feather-icon>
        <span class="text-lg ml-3">Tất cả</span>
      </router-link>
    </div>

    <vs-divider></vs-divider>

    <!-- starred -->
    <div class="px-6 py-4">
      <h5>Tiêu chí</h5>
      <vue-perfect-scrollbar :is="scrollbarTag" :key="$vs.rtl" :settings="settings"
                             @ps-scroll-y="scrollHanle" class="rule-scroll-area todo-scroll-area">
        <template v-for="rule in rules">
          <router-link :class="{'text-primary': ruleFilter === rule.id}" :key=rule.id
                       :to="`${baseUrl}/${rule.id}`" class="flex justify-between mt-6 cursor-pointer" tag="span">
            <span class="text-lg ml-3 text-rule-overflow" v-if="rule.status===1">{{ rule.name }}</span>
            <span class="line-through text-lg ml-3 text-rule-overflow" v-if="rule.status===0">{{ rule.name }}</span>
            <vs-dropdown class="button-height">
              <a class="flex self-start" href="#">
                <i class="material-icons"> more_vert </i>
              </a>
              <vs-dropdown-menu>
                <vs-dropdown-item :ruleId="rule.id" @click="displayRulePrompt(rule.id)">Chi tiết</vs-dropdown-item>
                <vs-dropdown-item :ruleId="rule.id" @click="deactivatedRule(rule.id)">Xóa</vs-dropdown-item>
              </vs-dropdown-menu>
            </vs-dropdown>
          </router-link>
        </template>
      </vue-perfect-scrollbar>

    </div>

    <vs-divider></vs-divider>
    <div class="px-6 py-4" v-if="statistical!=null">
      <star-rating :increment="0.01" :rating="statistical.avg" :read-only="true" :rtl="$vs.rtl" :star-size="20"
                   class="flex mb-1" v-if="statistical.avg"></star-rating>
      <div class="flex mb-4">{{statistical.length !== 0 ? statistical.total : 0}} đánh giá</div>
      <div class="todo__lables-list" v-if="statistical.avg">
            <span class="todo__label items-center mt-6 cursor-pointer">
              <div class="flex" style="line-height: 2.5"><star-rating :rating="5" :read-only="true" :rtl="$vs.rtl"
                                                                      :star-size="20"></star-rating>({{statistical.star5  ? statistical.star5 : 0}})</div>
              <div class="flex" style="line-height: 2.5"><star-rating :rating="4" :read-only="true" :rtl="$vs.rtl"
                                                                      :star-size="20"></star-rating> ({{statistical.star4 ? statistical.star4 : 0}})</div>
              <div class="flex" style="line-height: 2.5"><star-rating :rating="3" :read-only="true" :rtl="$vs.rtl"
                                                                      :star-size="20"></star-rating> ({{statistical.star3  ? statistical.star3 : 0}})</div>
              <div class="flex" style="line-height: 2.5"><star-rating :rating="2" :read-only="true" :rtl="$vs.rtl"
                                                                      :star-size="20"></star-rating> ({{statistical.star2 ? statistical.star2 : 0}})</div>
              <div class="flex" style="line-height: 2.5"><star-rating :rating="1" :read-only="true" :rtl="$vs.rtl"
                                                                      :star-size="20"></star-rating> ({{statistical.star1  ? statistical.star1 : 0}})</div>
            </span>
      </div>
    </div>
    <rule-detail :displayPrompt="displayPrompt" :ruleId=ruleDetailId @hiddenDisplayPrompt="hiddenPrompt"
                 v-if="displayPrompt"/>

  </div>

</template>

<script>

  import StarRating from 'vue-star-rating'
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'
  import ruleDetail from './components/ruleDetail'

  export default {
    props: {
      ruleId: {
        type: Number,
        // required: true
      }
    },
    data() {
      return {
        ruleDetailId: 0,
        displayPrompt: false,
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
    methods: {
      scrollHanle({target: {scrollTop, clientHeight, scrollHeight}}) {
        if (scrollTop + clientHeight >= scrollHeight) {
          this.page += 1
          const payload = {
            "item_per_page": 10,
            "page_number": this.page
          }
          this.$store.dispatch("rate/scrollRule", payload);

        }
      },
      displayRulePrompt(ruleDetailId) {
        this.ruleDetailId = ruleDetailId;
        this.displayPrompt = true;
      },
      hiddenPrompt() {
        this.displayPrompt = false;
      },
      deactivatedRule(ruleDetailId) {
        this.$store.dispatch('rate/deactiveRule', ruleDetailId).then((resp) => {
          this.$store.dispatch('rate/getListRules');
          this.$vs.notify({
            title: 'Xóa tiêu chí thành công',
            text: resp.data.message,
            position: 'top-right',
            color: 'success',
            iconPack: 'feather',
            icon: 'icon-check'
          });
        }).catch((error) => {
          this.$vs.notify({
            title: 'Lỗi',
            text: error.message,
            position: 'top-right',
            color: 'danger',
            iconPack: 'feather',
            icon: 'icon-x'
          });
        })
      }
    },
    computed: {
      scrollbarTag() {
        return this.$store.getters.scrollbarTag
      },
      rules() {
        return this.$store.getters["rate/getRules"]
      },
      ruleFilter() {
        return this.$route.params.ruleId
      },
      baseUrl() {
        const path = this.$route.path
        return path.slice(0, path.lastIndexOf('/'))
      },
      statistical() {
        return this.$store.getters["rate/getStatistical"]
      }
    },
    created() {
      this.$store.dispatch("rate/getListRules");
    },
    components: {
      VuePerfectScrollbar,
      ruleDetail,
      StarRating
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
