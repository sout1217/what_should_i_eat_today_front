<template>
  <header class="header">
    <div class="left">
      <div class="logo">
        <img src="@/assets/logo.png" alt="" />
      </div>
      <router-link tag="div" to="/" class="nav-item">카테고리</router-link>
      <router-link tag="div" to="/" class="nav-item">분류찾기</router-link>
      <router-link tag="div" to="/" class="nav-item">질문으로 찾기</router-link>
      <router-link tag="div" to="/" class="nav-item">월드컵</router-link>
    </div>

    <div class="right">
      <template v-if="token">
        <div class="no-select">
          {{ isLogin.name }}
        </div>
        <v-menu max-width="140" rounded offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-avatar size="36">
                <v-img :src="isLogin.profileImg"></v-img>
              </v-avatar>
            </v-btn>
          </template>
          <v-list dark class="bg-black-opacity text-center">
            <v-list-item
              :to="item.href"
              exact
              v-for="(item, index) in popoverItems"
              :key="index"
              link
            >
              <v-list-item-title>
                <span class="b3"> {{ item.name }}</span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-else>
        <div class="nav-item">
          <LoginPopover />
        </div>
      </template>
    </div>
  </header>
</template>

<script>
import LoginPopover from '@/views/components/LoginPopover'

export default {
  name: 'Header',
  components: { LoginPopover },
  data() {
    return {
      popoverItems: [
        { name: '글 작성', href: '/post/add' },
        { name: '마이페이지', href: '/mypage' },
        { name: '소식 모아보기', href: '#' },
        { name: '설정', href: '#' },
        { name: '로그아웃', href: '/logout' },
      ],
    }
  },
  async mounted() {
    try {
      if (this.$store.state.token) await this.$store.dispatch('GET_ME')
    } catch (error) {
      this.$store.commit('deleteToken')
      // this.$toastError('인증 실패')
    }
  },
  computed: {
    token() {
      return this.$store.state.token
    },
    isLogin() {
      return this.$store.getters.getMe
    },
  },
}
</script>

<style scoped lang="scss">
@import 'src/css/index';

.header {
  //background-color: $brand-primary-black;
  color: $grayscale-black-6;
  display: flex;
  align-items: center;
  height: 80px;
  padding: 0 16px;
  box-sizing: border-box;
  border-bottom: 1px solid $grayscale-black-3;

  .left {
    display: flex;
    align-items: center;
    flex: 1;
    gap: 0 16px;

    .logo {
      overflow: hidden;
      border-radius: 50px;

      img {
        width: 48px;
      }
    }
  }

  .right {
    display: flex;
    align-items: center;
    gap: 0 16px;
  }

  .nav-item {
    color: #dcdcdc5a;

    &::after {
      content: '';
      width: 0;
      height: 5px;
      display: block;
      background: $brand-primary-blue;
      margin-top: 5px;
      transition: 200ms;
    }

    &:hover {
      color: $grayscale-black-6;

      &::after {
        width: 100%;
      }
    }
  }

  .router-link-active {
    cursor: pointer;
  }

  .no-select {
    user-select: none;
  }
}
</style>
