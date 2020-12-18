<template>
  <div class="userManager">
    <p>{{ logInfo }}</p>
  </div>
</template>

<script>
  export default {
    computed: {
      logInfo() {
        return this.$acl.get[0]
      }
    }
  };
</script>
