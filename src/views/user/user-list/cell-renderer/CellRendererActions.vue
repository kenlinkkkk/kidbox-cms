<template>
    <div :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}">
      <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecord" />
      <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
    </div>
</template>

<script>
export default {
  name: 'CellRendererActions',
  methods: {
    editRecord () {
      this.$router.push("/admin/user/edit/" + this.params.data.id).catch(() => {})
    },
    confirmDeleteRecord () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Vô hiệu hóa tài khoản',
        text: `Có chắc bạn muốn vô hiệu hóa tài khoản "${this.params.data.name}" ?`,
        accept: this.deleteRecord,
        acceptText: 'Delete'
      })
    },
    deleteRecord () {
      /* UnComment below lines for enabling true flow if deleting user */
      this.$store.dispatch("userManagement/deleteUserById", { userId: this.params.data.id })
        .then((response)   => {
          if (response.status === 200) {
            if (response.data.code === 200) {
              this.showDeleteSuccess()
            } else {
              this.showDeleteFail()
            }
          } else {
            this.showDeleteFail()
          }
        })
        .catch(err => { console.error(err)       })
    },
    showDeleteSuccess () {
      this.$vs.notify({
        color: 'success',
        title: 'Đã vô hiệu hóa',
        text: 'Tài khoản đã được vô hiệu hóa'
      })
    },
    showDeleteFail () {
      this.$vs.notify({
        color: 'danger',
        title: 'Thất bại',
        text: 'Vô hiệu hóa tài khoản thất bại'
      })
    }
  }
}
</script>
