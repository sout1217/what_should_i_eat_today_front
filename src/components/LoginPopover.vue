<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      transition="scroll-y-reverse-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="indigo" dark v-bind="attrs" v-on="on">
          메뉴 팝오버
        </v-btn>
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
