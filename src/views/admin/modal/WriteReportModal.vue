<template>
  <v-dialog
    id="dialog"
    class="dia"
    overlay-color="black"
    overlay-opacity="0.9"
    light
    v-model="dialog"
    max-width="880"
    @click:outside="close"
  >
    <validation-observer ref="observer">
      <form>
        <v-card class="pa-10">
          <v-card-actions class="d-fex flex-column align-start mb-3">
            <template v-for="report in item">
              <v-hover :key="report.value" v-slot="{ hover }">
                <v-checkbox
                  dense
                  hide-details
                  v-model="selected"
                  :value="report.value"
                >
                  <template v-slot:label>
                    <div class="rounded-lg" :class="{ 'on-hover': hover }">
                      {{ report.label }}
                    </div>
                  </template>
                </v-checkbox>
              </v-hover>
            </template>
          </v-card-actions>

          <v-card-text>
            <validation-provider
              rules="required|limit:1,50"
              name="제목"
              v-slot="{ errors }"
            >
              <v-textarea
                v-model="title"
                outlined
                flat
                solo
                rows="1"
                label="입력하세요"
                auto-grow
                counter
                :error-messages="errors"
              >
                <template v-slot:prepend>
                  <div class="t1" style="width: 70px">신고제목</div>
                </template>
              </v-textarea>
            </validation-provider>
            <validation-provider
              rules="required|limit:1,255"
              name="내용"
              v-slot="{ errors }"
            >
              <v-textarea
                v-model="content"
                outlined
                solo
                flat
                label="입력하세요"
                counter
                auto-grow
                :error-messages="errors"
              >
                <template v-slot:prepend>
                  <div class="t1" style="width: 70px">신고사유</div>
                </template>
              </v-textarea>
            </validation-provider>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn @click="report" color="error"> 신고 </v-btn>
            <v-btn @click="close" color="primary"> 취소 </v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </validation-observer>
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
    reportType: {
      type: String,
      require: true,
    },
    id: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      selected: [],
      item: [
        { value: 1, label: '부적절한 닉네임' },
        { value: 2, label: '부적절한 게시글' },
        { value: 3, label: '부적절한 프로필 이미지' },
        { value: 4, label: '부적절한 언어 사용' },
        { value: 5, label: '기타' },
      ],
      title: '',
      content: '',
    }
  },
  methods: {
    /** 신고하기 */
    report() {
      this.$refs.observer
        .validate()
        .then(rs => {
          if (!rs) return
          const data = {
            title: this.title,
            content: this.content,
          }
          if (this.reportType === 'POST') {
            data.postId = this.id
          } else if (this.reportType === 'REVIEW') {
            data.reviewId = this.id
          } else if (this.reportType === 'PROFILE') {
            data.reportedMemberId = this.id
          }
          this.$emit('report', data)
          this.clear()
        })
        .catch(error => this.$toastError(error))
    },
    /** 닫기 */
    close() {
      this.clear()
      this.$emit('close')
    },
    /** 데이터 초기화하기 */
    clear() {
      this.$refs.observer.reset()
      this.title = ''
      this.content = ''
      this.selected = []
    },
  },
}
</script>

<style lang="scss">
.v-dialog::-webkit-scrollbar {
  display: none !important;
}
.on-hover {
  color: #2284f5;
  transition: all 0.3s ease-in-out;
}
</style>
