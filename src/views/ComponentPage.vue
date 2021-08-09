<!--
컴포넌트 개발 내역을 모아둔 임시 페이지 입니다.
-->
<template>
  <div class="component-page">
    <div>
      <v-btn elevation="2" @click="toasts">토스트 확인하기</v-btn>
    </div>
    <mdicon name="react" />

    <Header />

    <news-popover />
  </div>
</template>

<script>
import Header from '@/components/common/header/Header'
import NewsPopover from '@/components/common/header/NewsPopover'
export default {
  name: 'ComponentPage',
  components: { NewsPopover, Header },
  methods: {
    toasts() {
      this.$toastSuccess('Success')
      this.$toastWarning('Warning')
      this.$toastError('Error')
    },
  },
}
</script>

<style scoped lang="scss">
@import './src/css/index';
.component-page {
  background-color: $brand-primary-black;
  padding: 100px 16px;
}
</style>
