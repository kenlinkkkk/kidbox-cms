<!-- =========================================================================================
    File Name: TodoItem.vue
    Description: Single todo item component
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div class="px-4 py-4 list-item-component">
        <div class="flex justify-between">
          <div class="vx-row">
            <div class="vx-col">
              <div class="flex items-center">
                  <vs-avatar :src="taskLocal.user.image_url.path" size="50px"/> 
              </div>
            </div>
            <div class="vx-col">
                <h6 class="todo-title">{{ taskLocal.user.name }}</h6>
                <star-rating :rtl="$vs.rtl" :rating="taskLocal.rate_point" :read-only="true" :star-size="20" v-if="taskLocal.rule.has_point==='true'"></star-rating>
                <p class="mt-2 truncate">{{ taskLocal.note }}</p>
            </div>
          </div>
          <div>
              <p>{{taskLocal.create_date}}</p>
          </div>
        </div>

    </div>
</template>

<script>
import StarRating from 'vue-star-rating'
export default{
  props: {
    rateId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      taskLocal: this.$store.getters["rate/getRate"](this.rateId)
    }
  },
  components: {
    StarRating
  }
}
</script>
