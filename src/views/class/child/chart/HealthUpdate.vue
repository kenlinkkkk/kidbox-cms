<template>
  <vs-prompt
    title="Cập nhật thông tin sức khỏe"
    accept-text="Cập nhật"
    cancel-text="Hủy"
    button-cancel="border"
    @accept="saveChanges"
    :is-valid="validateForm"
    :active.sync="activeHealthPrompt">
    <div>
      <div class="vx-row">
        <div class="vx-col w-full">
          <vs-input class="w-full mt-4" label="Cân nặng" type="number" v-model="healthInfo.weight" v-validate="'required'" name="weight" />
          <span class="text-danger text-sm"  v-show="errors.has('weight')">{{ errors.first('weight') }}</span>
          <vs-input class="w-full mt-4" label="Chiều cao" type="number" v-model="healthInfo.height" v-validate="'required'" name="height" />
          <span class="text-danger text-sm"  v-show="errors.has('height')">{{ errors.first('height') }}</span>
        </div>
      </div>
    </div>
  </vs-prompt>
</template>

<script>
import PerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  name: "HeathUpdate",
  props: {
    childHealthPrompt: {
      type: Boolean,
      required: true
    },
    childId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      healthInfo: {
        child_id: Number.parseInt(this.$route.params.childId),
        weight: null,
        height: null
      }
    }
  },
  components: {
    PerfectScrollbar
  },
  computed: {
    validateForm () {
      if (this.healthInfo.weight === null || this.healthInfo.height === null) {
        return false
      }

      return !this.errors.any()
    },
    activeHealthPrompt: {
      get() {
        return this.childHealthPrompt
      },
      set(value) {
        this.$emit('hiddenHealthPrompt', value)
      }
    },
  },
  methods: {
    async saveChanges () {
      let response = await  this.$store.dispatch('child/healthAddNew', this.healthInfo)
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
    }
  }
}
</script>

<style scoped>

</style>
