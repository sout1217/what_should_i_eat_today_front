<template>
  <div><button @click="toast">click</button></div>
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

<style scoped></style>
