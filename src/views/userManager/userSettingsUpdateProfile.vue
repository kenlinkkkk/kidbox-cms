<template>
  <vx-card no-shadow>
    <vs-input class="w-full mb-base" label-placeholder="Tên" v-model="name" />
    <vs-input class="w-full mb-base" label-placeholder="Địa chỉ" v-model="address" />
    <vs-input class="w-full mb-base" label-placeholder="Email" v-model="email" />
    <vs-input class="w-full mb-base" label-placeholder="Số điện thoại" v-model="phone_number" />
    <vs-input class="w-full mb-base" label-placeholder="Số phụ" v-model="second_phone_number" />

    <div class="flex flex-wrap items-center justify-end">
      <vs-button class="ml-auto mt-2">Lưu thay đổi</vs-button>
      <vs-button class="ml-4 mt-2" type="border" color="warning">Reset</vs-button>
    </div>
  </vx-card>
</template>

<script>
  export default {
    data() {
      return {
        name: '',
        address: '',
        email: '',
        phone_number: '',
        second_phone_number: '',
      }
    },
  }
</script>
