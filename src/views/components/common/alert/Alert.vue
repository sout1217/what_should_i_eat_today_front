<template>
  <v-dialog
    v-model="dialog"
    max-width="450"
    dark
    style="border-radius: 20px"
    @click:outside="closeDialog"
  >
    <v-card>
      <v-card-text class="font-weight-medium pt-8">
        <span class="t1">{{ message }}</span>
      </v-card-text>

      <v-card-actions class="px-6 pb-6">
        <v-spacer></v-spacer>
        <v-btn class="system-error grayscale-white--text" @click="okAction">
          <span class="t2">{{ ok }}</span>
        </v-btn>
        <v-btn
          v-if="no"
          class="system-success grayscale-white--text"
          @click="cancelAction"
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
    return {}
  },
  props: {
    message: { type: String, default: '메시지' },
    ok: { type: String, default: '확인' },
    no: { type: String, default: '' },
    dialog: { type: Boolean, default: false },
    okAction: {
      type: Function,
      default: function () {
        this.$emit('ok')
      },
    },
    cancelAction: {
      type: Function,
      default: function () {
        this.$emit('cancel')
      },
    },
    closeAction: {
      type: Function,
      default: function () {
        this.$emit('close')
      },
    },
  },
  methods: {
    closeDialog() {
      this.$emit('close ')
    },
  },
}
</script>

<style scoped></style>
