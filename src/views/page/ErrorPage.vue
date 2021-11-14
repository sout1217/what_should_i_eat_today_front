<template>
  <router-link to="/" class="text-decoration-none">
    <cat />
    <h1 align="center" class="white--text">{{ message }}</h1>
  </router-link>
</template>

<script>
import Cat from '@/views/components/common/error/Cat'
export default {
  name: 'ErrorPage',
  components: { Cat },
  computed: {
    message() {
      return this.$route.params?.message || '404 페이지를 찾을 수 없습니다'
    },
  },
}
</script>

<style scoped lang="scss"></style>
