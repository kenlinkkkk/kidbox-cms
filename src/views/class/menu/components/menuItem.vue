<template>
  <div>
    <p>Menu content</p>
  </div>
</template>

<script>
  export default {
    props: {
      classId: {
        type: Number,
        require: true
      },
      dateInput: {
        type: String,
        require: true,
      }
    },
    data() {
      return {
        class_id: this.classId,
        note: '',
        date: this.dateInput,
        inputs: [{
          name: '',
          time: '',
          image_url: ''
        }]
      }
    },
    methods: {
      addElement() {
        this.inputs.push({
          name: '',
          time: '',
          image_url: ''
        })
      },
      removeElement(index) {
        this.inputs.splice(index, 1)
      }
    }
  }
</script>

