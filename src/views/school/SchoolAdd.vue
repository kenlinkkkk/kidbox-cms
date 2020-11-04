<template>
  <vx-card no-shadow>
    <form-wizard color="rgba(var(--vs-primary), 1)" :title="null" :subtitle="null" finishButtonText="Submit" @on-complete="formSubmitted">
      <tab-content title="Thêm thông tin trường học" class="mb-5" icon="feather icon-home">

        <!-- tab 1 content -->
        <div class="vx-row">
          <div class="vx-col md:w-1/2 w-full mt-5">
            <vs-input label="First Name" v-model="firstName" class="w-full" />
          </div>
          <div class="vx-col md:w-1/2 w-full mt-5">
            <vs-input label="Last Name"  v-model="lastName" class="w-full" />
          </div>
          <div class="vx-col md:w-1/2 w-full mt-5">
            <vs-input type="email" label="Email"  v-model="email" class="w-full" />
          </div>
          <div class="vx-col md:w-1/2 w-full mt-5">
            <vs-select v-model="city" class="w-full select-large" label="City">
              <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in cityOptions" class="w-full" />
            </vs-select>
          </div>
        </div>
      </tab-content>

      <!-- tab 2 content -->
      <tab-content title="Thêm thông tin tài khoản" class="mb-5" icon="feather icon-briefcase">
        <div class="vx-row">
          <div class="vx-col md:w-1/2 w-full">
            <vs-input label="Proposal Title" v-model="proposalTitle" class="w-full mt-4" />
            <vs-input label="Job Title"  v-model="jobTitle" class="w-full mt-4" />
          </div>
          <div class="vx-col md:w-1/2 w-full">
            <vs-textarea v-model="textarea" label="Short discription" class="mb-0 md:mt-10 mt-6" rows="3" />
          </div>
        </div>
      </tab-content>
    </form-wizard>
  </vx-card>
</template>

<script>
  import {FormWizard, TabContent} from 'vue-form-wizard'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'

  export default {
    data() {
      return {
        firstName: "",
      }
    },
    methods: {
      formSubmitted() {
        alert("Form submitted!");
      }
    },
    components: {
      FormWizard,
      TabContent
    }
  }
</script>
