<!--
컴포넌트 개발 내역을 모아둔 임시 페이지 입니다.
-->
<template>
  <div>
    <div>
      <v-btn elevation="2" @click="toasts">토스트 확인하기</v-btn>
    </div>
    <AutoComplete></AutoComplete>
    <mdicon name="react" />

    <Header />
  </div>
</template>

<script>
import Header from '@/components/common/Header'
import AutoComplete from '@/components/admin/common/AutoComplete'

export default {
  name: 'ComponentPage',
  components: {
    AutoComplete, Header,
  },
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
