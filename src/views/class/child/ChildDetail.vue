<template>
  <div id="child-profile">
    <div class="vx-row">
      <div class="vx-col w-full lg:w-1/4" v-if="childInfo">
        <!-- ABOUT CARD -->
        <vx-card title="Thông tin cơ bản" class="mt-base">
          <!-- ACTION SLOT -->
          <template slot="actions">
            <vs-dropdown class="button-height" vs-trigger-click>
              <a class="flex self-start" href="#">
                <feather-icon icon="MoreHorizontalIcon"></feather-icon>
              </a>
              <vs-dropdown-menu>
                <vs-dropdown-item @click="displayInfoPrompt">Cập nhật thông tin</vs-dropdown-item>
              </vs-dropdown-menu>
            </vs-dropdown>
          </template>
          <div class="flex">
            <div>
              <vs-avatar
                :src="childInfo.image_url.path"
                size="large"
                class="mr-8"
              />
            </div>
            <div>
              <!-- USER BIO -->
              <div class="user-bio">
                <h6>Tên:</h6>
                <p>{{ childInfo.name }}</p>
              </div>

              <div class="mt-5">
                <h6>Biệt danh:</h6>
                <p>{{ childInfo.nickname }}</p>
              </div>

              <!-- OTEHR DATA -->
              <div class="mt-5">
                <h6>Giới tính:</h6>
                <p>{{ childInfo.gender === 1? 'Nam' : "Nữ" }}</p>
              </div>

              <div class="mt-5">
                <h6>Ngày sinh:</h6>
                <p>{{ childInfo.dob | formatLongDateWithoutTime }}</p>
              </div>

              <div class="mt-5">
                <h6>Phụ huynh:</h6>
                <p>{{ childInfo.parent}}</p>
              </div>

              <div class="mt-5">
                <h6>Số điện thoại phụ huynh:</h6>
                <a :href="'tel:' + childInfo.phone_number">{{ childInfo.phone_number }}</a>
              </div>
            </div>
          </div>
        </vx-card>
        <vx-card title="Thành tích" class="mt-base">
          <!-- ACTION SLOT -->
          <template slot="actions">
            <vs-dropdown class="button-height" vs-trigger-click>
              <a class="flex self-start" href="#">
                <feather-icon icon="MoreHorizontalIcon"></feather-icon>
              </a>
              <vs-dropdown-menu>
                <vs-dropdown-item @click="displayAchievementPrompt">Cập nhật thông tin</vs-dropdown-item>
              </vs-dropdown-menu>
            </vs-dropdown>
          </template>
          <div class="flex">
            <achievement-list />
          </div>
        </vx-card>
      </div>
      <div class="vx-col w-full lg:w-3/4">
        <health-chart />
      </div>
    </div>
    <child-edit
      v-if="displayInfoPrompt"
      :childId="Number.parseInt(this.$route.params.childId)"
      :childInfoPrompt="activeInfoPrompt"
      @hiddenInfoPrompt="hiddenInfoPrompt"/>
    <achievement-add
      v-if="displayAchievementPrompt"
      :childId="Number.parseInt(this.$route.params.childId)"
      :childAchievementPrompt="activeAchievementPrompt"
      @hiddenAchievementPrompt="hiddenAchievementPrompt"/>
  </div>
</template>

<script>
import HealthChart from "@/views/class/child/chart/HealthChart";
import AchievementList from "@/views/class/child/achievement/AchievementList";
import ChildEdit from "@/views/class/child/ChildEdit";
import AchievementAdd from "@/views/class/child/achievement/AchievementAdd";

export default {
  data () {
    return {
      childInfo: null,
      childInfoId: null,
      activeInfoPrompt: false,
      activeAchievementPrompt: false,
    }
  },
  components: {
    ChildEdit,
    HealthChart,
    AchievementList,
    AchievementAdd
  },
  methods: {
    displayInfoPrompt () {
      this.activeInfoPrompt = true;
    },
    hiddenInfoPrompt () {
      this.activeInfoPrompt = false;
    },
    displayAchievementPrompt () {
      this.activeAchievementPrompt = true
    },
    hiddenAchievementPrompt () {
      this.activeAchievementPrompt = false
    }
  },
  computed: {
  },
  async created() {
    let childIdInfo = Number.parseInt(this.$route.params.childId)

    let response = await this.$store.dispatch('child/getChildDetail', { id: childIdInfo })
    if (response.code === 200) {
      this.childInfo = response.data.info
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
