<template>
  <v-dialog v-model="dialog" max-width="450" dark style="border-radius: 20px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
        Click Me
      </v-btn>
    </template>

    <v-card>
      <v-card-text class="font-weight-medium pt-8">
        <span class="t1">{{ message }}</span>
      </v-card-text>

      <v-card-actions class="px-6 pb-6">
        <v-spacer></v-spacer>
        <v-btn
          class="system-error grayscale-white--text"
          @click="dialog = false"
        >
          <span class="t2">{{ ok }}</span>
        </v-btn>
        <v-btn
          class="system-success grayscale-white--text"
          @click="dialog = false"
        >
          <span class="t2">{{ no }}</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Alert',
  data() {
    return {
      dialog: false,
    }
  },
  props: {
    message: { type: String, default: '메시지' },
    ok: { type: String, default: '확인' },
    no: { type: String, default: '취소' },
  },
}
</script>

<style scoped></style>
