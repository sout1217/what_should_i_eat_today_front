<template>
  <v-app>
    <Header />
    <v-main app>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from '@/views/components/common/header/Header'
export default {
  name: 'Index',
  components: { Header },
}
</script>

<style lang="scss">
#app {
  background-color: var(--v-background-base);
}
</style>
