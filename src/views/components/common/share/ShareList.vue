<template>
  <div class="border-white d-flex justify-center align-center px-1">
    <v-btn icon class="bg-brand-primary-black pointer" @click="copy()">
      <naver-icon fill="white" />
    </v-btn>
    <v-btn icon class="bg-brand-primary-black pointer" @click="copy()">
      <kakao-icon fill="white" />
    </v-btn>
    <v-btn icon class="bg-brand-primary-black pointer" @click="copy()">
      <google-icon />
    </v-btn>
  </div>
</template>

<script>
import NaverIcon from '@/views/components/common/share/NaverIcon'
import KakaoIcon from '@/views/components/common/share/KakaoIcon'
import GoogleIcon from '@/views/components/common/share/GoogleIcon'
export default {
  name: 'ShareGroup',
  components: { GoogleIcon, KakaoIcon, NaverIcon },
  methods: {
    test() {
      navigator.share({
        title: '재그지그의 개발 블로그',
        text: '디자인과 UI, UX에 관심이 많은 주니어 웹 프론트엔드 개발자입니다.',
        url: 'https://wormwlrm.github.io',
      })
    },
    copy() {
      navigator.clipboard.writeText(window.location.href).then(() => {
        this.$toastSuccess('복사 완료')
      })
    },
  },
}
</script>

<style scoped lang="scss">
.border-white {
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  gap: 4px;
}
</style>
