<template>
  <vs-prompt
    title="Cập nhật thông tin thành tích"
    accept-text="Cập nhật"
    cancel-text="Hủy"
    button-cancel="border"
    @accept="saveChanges"
    :is-valid="validateForm"
    :active.sync="activeAchievementPrompt">
    <div>
      <div class="vx-row">
        <div class="vx-col w-full">
          <label>Thành tích của bé</label>
          <v-select class="mr-3" label="name" :options="listLoyal" @input="achievementSelect" :v-model="achievementInfo.loyal_code" :dir="$vs.rtl ? 'rtl' : 'ltr'" />

          <vs-input class="w-full mt-4" label="Ghi chú" type="number" v-model="achievementInfo.note" name="note" />
        </div>
      </div>
    </div>
  </vs-prompt>
</template>

<script>
import vSelect from 'vue-select'
export default {
  name: "AchievementAdd",
  props: {
    childId: {
      type: Number,
      required: true
    },
    childAchievementPrompt: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      achievementInfo: {
        child_id: Number.parseInt(this.$route.params.childId),
        loyal_code: null,
        note: null
      },
      listLoyal: null
    }
  },
  components: {
    vSelect
  },
  computed: {
    validateForm () {
      if (this.achievementInfo.achievementInfo === null) {
        return false
      }
      return !this.errors.any()
    },
    activeAchievementPrompt: {
      get() {
        return this.childAchievementPrompt
      },
      set(value) {
        this.$emit('hiddenAchievementPrompt', value)
      }
    },
  },
  methods: {
    async saveChanges () {
      let response = await  this.$store.dispatch('child/achievementAdd', this.achievementInfo)
      if (response.data.code === 200) {
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
    achievementSelect(event) {
      this.achievementInfo.loyal_code = event.id
    }
  },
  async created() {
    this.listLoyal = await this.$store.dispatch('child/getListLoyal')
  }
}
</script>

<style scoped>

</style>
