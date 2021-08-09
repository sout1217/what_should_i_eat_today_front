<template>
  <div>
    <button @click="toast">click</button>
    <p>Hello <span class="h1">world</span></p>
    <p>Hello <span class="secondary-heart">bye</span></p>
  </div>
</template>

<script>
export default {
  name: 'MainPage.vue',
  methods: {
    toast() {
      this.$toastSuccess('Success')
      this.$toastWarning('Warning')
      this.$toastError('Error')
    },
  },
}
</script>

<style lang="scss">
p {
  span {
    color: red;
  }
}
</style>
