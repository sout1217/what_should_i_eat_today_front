<template>
  <v-app>
    <!-- https://v15.vuetifyjs.com/ko/components/navigation-drawers/ -->
    <!-- src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg" -->
    <v-navigation-drawer
      app
      dark
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img :src="require('@/assets/logo.png')"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>관리 서비스</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider />

      <v-list nav expand>
        <template v-for="([icon, text, child], i) in items">
          <v-list-group :prepend-icon="icon" :key="i">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title> {{ text }} </v-list-item-title>
              </v-list-item-content>
            </template>
            <template>
              <v-list-item
                v-for="[c_text, c_link] in child"
                :key="c_text"
                link
                :to="c_link"
                class=""
                active-class="error white--text"
              >
                <v-list-item-icon>
                  <v-icon> checkbox-blank-circle </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ c_text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
let root = '/admin'
export default {
  name: 'Index',
  data() {
    return {
      drawer: true,
      mini: true,
      items: [
        ['mdi-email', '카테고리 관리', [['카테고리 관리', `${root}/category`]]],
        [
          'mdi-account-supervisor-circle',
          '태그관리',
          [['태그관리', `${root}/tag`]],
        ],
        ['mdi-clock-start', '음식 관리', [['음식 관리', `${root}/food`]]],
        [
          'mdi-microsoft-xbox',
          '질문으로 관리',
          [
            ['질문 관리', `${root}/question`],
            ['묶음 관리', `${root}/package`],
            ['과정 관리', `${root}/course`],
          ],
        ],
        ['mdi-microsoft-edge', 'QNA 관리', [['QNA 관리', `${root}/qna`]]],
        ['mdi-bullhorn', '신고 관리', [['신고 관리', `${root}/report`]]],
      ],
    }
  },
  mounted() {
    this.$vuetify.theme.dark = false
  },
  methods: {
    test() {
      alert('hello')
    },
  },
}
</script>

<style scoped>
.v-navigation-drawer {
  border-radius: 0 30px 0 0;
}
</style>
