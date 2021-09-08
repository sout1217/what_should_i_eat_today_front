<template>
  <div>
    <cat />
    <h1 align="center" class="white--text">페이지를 찾을 수 없습니다</h1>
  </div>
</template>

<script>
import Cat from '@/views/components/common/error/Cat'
export default {
  name: 'NotFoundPage',
  components: { Cat },
}
</script>

<style scoped lang="scss"></style>
