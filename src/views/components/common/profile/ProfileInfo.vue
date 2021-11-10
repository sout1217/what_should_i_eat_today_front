<template>
  <div class="mr-2">
    <v-menu v-model="menu" :close-on-content-click="false" offset-x>
      <template v-slot:activator="{ on, attrs }">
        <v-avatar :size="size" v-on="on" v-bind="attrs">
          <v-img dark :src="member.profileImg" />
        </v-avatar>
      </template>
      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img :src="member.profileImg" :alt="member.name" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ member.name }}</v-list-item-title>
              <v-list-item-subtitle>Best</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item>
            <v-list-item-action>
              <v-switch v-model="message" color="red"></v-switch>
            </v-list-item-action>
            <v-list-item-title class="b2">구독하기</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-subtitle> 작성한 글 수 : ∞ </v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn plain text color="red" @click="report">
            <span class="b3">신고하기</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
export default {
  name: 'profile-info',
  data() {
    return {
      fav: true,
      menu: false,
      message: false,
      hints: true,
    }
  },
  props: {
    member: {
      require: true,
    },
    size: {
      default: 32,
    },
  },
  methods: {
    report() {
      this.$emit('report', this.member.id)
    },
  },
}
</script>
<style scoped lang="scss">
@media screen and (max-width: 954px) {
}
</style>
