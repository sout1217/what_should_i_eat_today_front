<!--
컴포넌트 개발 내역을 모아둔 임시 페이지 입니다.
-->
<template>
  <div>
    <div>
      <v-btn elevation="2" @click="toasts">토스트 확인하기</v-btn>
    </div>
    <mdicon name="react" />

    <LoginPopover />
  </div>
</template>

<script>
import LoginPopover from '@/components/LoginPopover'
export default {
  name: 'ComponentPage',
  components: { LoginPopover },
  methods: {
    toasts() {
      this.$toastSuccess('Success')
      this.$toastWarning('Warning')
      this.$toastError('Error')
    },
  },
}
</script>

<style scoped></style>
