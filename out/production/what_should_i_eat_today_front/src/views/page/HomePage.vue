<template>
  <div>
    HOME
    <router-link to="/login">로그인</router-link> |
    <router-link to="/signup">회원가입 </router-link> |
    <router-link to="/components">컴포넌트 구경하기</router-link> |
    <router-link to="/components2">카테고리 컴포넌트 구경하기</router-link> |
    <router-link to="/404">에러 페이지 구경하기</router-link>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
}
</script>
