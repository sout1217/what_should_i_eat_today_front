<template>
  <v-app id="app">
    <router-link to="/login">로그인</router-link> |
    <router-link to="/signup">회원가입 </router-link> |
    <router-link to="/components">컴포넌트 구경하기</router-link> |
    <router-link to="/category">카테고리 컴포넌트 구경하기</router-link>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script></script>

<style></style>
