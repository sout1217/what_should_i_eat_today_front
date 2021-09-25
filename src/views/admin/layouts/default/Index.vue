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
        <template v-for="(route, i) in items">
          <!-- if -->
          <v-list-group
            v-if="route.children"
            :prepend-icon="route.meta.icon"
            :key="`parent-${i}`"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title> {{ route.meta.title }} </v-list-item-title>
              </v-list-item-content>
            </template>
            <template v-for="(children, i) in route.children">
              <v-list-item
                link
                :to="children.meta.fullPath"
                exact
                active-class="error white--text"
                :key="i"
              >
                <v-list-item-icon>
                  <v-icon> {{ children.meta.icon }} </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ children.meta.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list-group>
          <!-- else -->
          <v-list-item
            v-else
            link
            exact
            :to="route.meta.fullPath"
            active-class="error white--text"
            :key="`children-${i}`"
          >
            <v-list-item-icon>
              <v-icon> {{ route.meta.icon }} </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ route.meta.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      drawer: true,
      mini: true,
      items: [
        {
          path: '/',
          name: 'DashBoardPage',
          meta: {
            icon: 'mdi-view-dashboard',
            title: '대시보드',
            fullPath: '/admin',
          },
        },
        {
          path: '/category',
          meta: {
            icon: 'mdi-view-dashboard',
            title: '카테고리',
            fullPath: '/admin/category',
          },
          children: [
            {
              path: '/',
              meta: {
                icon: 'mdi-view-dashboard',
                title: '목록보기',
                fullPath: '/admin/category',
              },
            },
            {
              path: '/write',
              meta: {
                icon: 'mdi-view-dashboard',
                title: '등록하기',
                fullPath: '/admin/category/write',
              },
            },
          ],
        },

        {
          path: '/report',
          name: '신고관리',
          meta: {
            icon: 'mdi-view-dashboard',
            title: '신고관리',
            fullPath: '/admin/report',
          },
        },
      ],
    }
  },
  mounted() {
    this.$vuetify.theme.dark = false
  },
}
</script>

<style scoped>
.v-navigation-drawer {
  border-radius: 0 30px 0 0;
}
</style>
