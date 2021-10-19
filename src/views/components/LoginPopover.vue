<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      transition="scroll-y-reverse-transition"
      nudge-top="-25"
    >
      <template v-slot:activator="{ on, attrs }">
        <div class="nav-item" v-on="on" v-bind="attrs">로그인</div>
      </template>

      <v-card>
        <v-list>
          <v-list-item class="mb-2">
            <v-btn block color="amber" large>
              <span class="b1 grayscale-white">카카오 로그인</span>
            </v-btn>
          </v-list-item>
          <v-list-item class="mb-2">
            <v-btn block color="gray" large>
              <span class="b1">구글 로그인</span>
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn block color="green lighten-1" large>
              <span class="b1 grayscale-white"> 네이버 로그인 </span>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'LoginPopover',
  data() {
    return {
      fav: true,
      menu: false,
      message: false,
      hints: true,
    }
  },
}
</script>

<style scoped></style>
