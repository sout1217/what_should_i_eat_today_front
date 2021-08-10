<template>
  <div>
    <cat />
    페이지를 찾을 수 없습니다
  </div>
</template>

<script>
import Cat from '@/components/common/error/Cat'
export default {
  name: 'NotFoundPage',
  components: { Cat },
}
</script>

<style scoped></style>
