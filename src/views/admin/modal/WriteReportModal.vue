<template>
  <v-dialog
    overlay-color="black"
    overlay-opacity="0.9"
    light
    v-model="dialog"
    max-width="880"
    @click:outside="close"
  >
    <v-card class="pa-16">
      <v-card-actions slot="button"> 카테고리에 음식 추가하기 </v-card-actions>

      <v-card-text class="mt-5"> 텍스트 </v-card-text>

      <v-card-actions> 액션 </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'WriteReportModal',
  props: {
    dialog: {
      type: Boolean,
      value: false,
      require: true,
    },
  },
  data() {
    return {}
  },
  methods: {
    close() {
      this.$emit('close')
    },
  },
}
</script>

<style scoped></style>
