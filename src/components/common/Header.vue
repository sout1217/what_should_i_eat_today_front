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
      <router-link tag="div" to="/" class="nav-item">로그인</router-link>
      <router-link tag="div" to="/" class="nav-item">회원가입</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style scoped lang="scss">
@import '../../css/index';
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
}
</style>
