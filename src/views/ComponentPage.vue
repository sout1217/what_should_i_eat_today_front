<!--
컴포넌트 개발 내역을 모아둔 임시 페이지 입니다.
-->
<template>
  <div class="component-page">
    <div>
      <v-btn elevation="2" @click="toasts">토스트 확인하기</v-btn>
    </div>
    <AutoComplete></AutoComplete>
    <mdicon name="react" />

    <Header />

    <LoginPopover />

    <news-popover />

    <br />
    <br />

    <card-list />

    <br />
    <br />

    <card-list-group :cards="cards" groupName="추천글" />
    <card-list-group :cards="cards" groupName="최근 올라온 글" class="mt-5" />
    <card-list :cards="cards" />
    <card-item :card="cards[0]" />
    <naver-icon fill="mediumseagreen" />
    <google-icon />
    <kakao-icon fill="orange" width="100" height="100" />
  </div>
</template>

<script>
import AutoComplete from '@/components/admin/common/AutoComplete'
import LoginPopover from '@/components/LoginPopover'
import Header from '@/components/common/header/Header'
import NewsPopover from '@/components/common/header/NewsPopover'
import CardList from '@/components/common/card/CardList'
import CardListGroup from '@/components/common/card/CardListGroup'
import CardItem from '@/components/common/card/CardItem'
import NaverIcon from '@/components/common/share/NaverIcon'
import GoogleIcon from '@/components/common/share/GoogleIcon'
import KakaoIcon from '@/components/common/share/KakaoIcon'
export default {
  name: 'ComponentPage',
  data() {
    return {
      cards: [
        {
          groupName: '추천글',
          title: 'Pre-fab homes',
          src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          flex: 12,
        },
        {
          groupName: '추천글',
          title: 'Pre-fab homes',
          src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          flex: 12,
        },
        {
          groupName: '추천글',
          title: 'Pre-fab homes',
          src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          flex: 12,
        },
        {
          groupName: '추천글',
          title: 'Pre-fab homes',
          src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          flex: 12,
        },
        {
          groupName: '추천글',
          title: 'Pre-fab homes',
          src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          flex: 12,
        },
        {
          groupName: '추천글',
          title: 'Pre-fab homes',
          src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          flex: 12,
        },
        {
          groupName: '추천글',
          title: 'Pre-fab homes',
          src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          flex: 12,
        },
        {
          groupName: '추천글',
          title: 'Pre-fab homes',
          src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          flex: 12,
        },
      ],
    }
  },
  components: {
    KakaoIcon,
    GoogleIcon,
    NaverIcon,
    CardItem,
    CardListGroup,
    CardList,
    AutoComplete,
    Header,
    LoginPopover,
    NewsPopover,
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

<style scoped lang="scss">
@import './src/css/index';
.component-page {
  background-color: $brand-primary-black;
  padding: 100px 16px;
}
</style>
