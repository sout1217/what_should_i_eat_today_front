<template>
  <div class="admin-container">
    <div class="admin-content-wrapper">
      <!-- 검색바 -->
      <v-container class="d-flex justify-center">
        <v-row align="center" class="d-flex flex-row-reverse">
          <v-col cols="6" sm="3">
            <v-text-field
              class="admin-search"
              label="enter text"
              outlined
              dense
              hide-details
              v-model="condition.title"
              @keydown="searchIfPressEnter"
            >
              <v-icon slot="append" color="black" @click="search">
                mdi-magnify
              </v-icon>
            </v-text-field>
          </v-col>
          <v-col class="" cols="6" sm="2">
            <v-select
              :items="selectItems"
              label="처리상태"
              @change="searchWithSelect"
              hide-details
              dense
              outlined
            ></v-select>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="d-flex justify-center">
        <v-row>
          <v-col cols="12" align-self="center">
            <v-data-table
              :headers="headers"
              :items="data"
              class="elevation-1"
              item-key="name"
              hide-default-footer
              dense
              :single-select="true"
            >
              <template v-slot:item.title="{ item }">
                <span class="p-focus" @click="showModal(item.id)">{{
                  item.title
                }}</span>
              </template>
              <template v-slot:item.status="{ item }">
                <span v-html="item.status">{{ item.status }}</span>
              </template>
            </v-data-table>
          </v-col>
          <v-col cols="12">
            <v-pagination v-model="page" :length="length"></v-pagination>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- 모달 -->
    <template>
      <div class="text-center">
        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title class="text-h5 lighten-2"> 사용자 신고 </v-card-title>

            <v-container class="d-flex justify-center">
              <v-row>
                <v-col cols="6" align-self="center">
                  <h2>신고 유형</h2>
                  <v-text-field
                    outlined
                    dense
                    hide-details
                    disabled
                    v-model="form.type"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" align-self="center">
                  <h2>신고자</h2>
                  <v-text-field
                    outlined
                    dense
                    hide-details
                    disabled
                    v-model="form.email"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-container class="d-flex justify-center">
              <v-row>
                <v-col cols="12" align-self="center">
                  <h2>질문 제목</h2>
                  <v-text-field
                    outlined
                    dense
                    hide-details
                    disabled
                    v-model="form.title"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-container class="d-flex justify-center">
              <v-row>
                <v-col cols="12" align-self="center">
                  <h2>질문 내용</h2>
                  <v-text-field
                    outlined
                    dense
                    hide-details
                    disabled
                    v-model="form.content"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-container class="d-flex justify-center">
              <v-row>
                <v-col cols="12" align-self="center">
                  <h2>게시글</h2>
                  <v-card elevation="2">
                    <div v-if="form.specify"></div>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
            <!-- 리폿의 종류에 따라 다르게 보여줌 -->
            <v-container>
              <v-row>
                <v-col cols="12" align-self="center">
                  <v-card elevation="2" v-if="form.type == 'POST'">
                    이메일 : {{ form.specify.post.email }} <br />
                    닉네임 : {{ form.specify.post.nickName }} <br />
                    이름 : {{ form.specify.post.name }} <br />
                    제목 : {{ form.specify.post.title }} <br />
                    내용 : {{ form.specify.post.content }}
                  </v-card>
                  <v-card elevation="2" v-if="form.type == 'REVIEW'">
                    이메일 : {{ form.specify.review.email }} <br />
                    닉네임 : {{ form.specify.review.nickName }} <br />
                    이름 : {{ form.specify.review.name }} <br />
                    내용 : {{ form.specify.review.content }}
                  </v-card>
                  <v-card elevation="2" v-if="form.type == 'PROFILE'">
                    이메일 : {{ form.specify.profile.email }} <br />
                    닉네임 : {{ form.specify.profile.nickName }} <br />
                    이름 : {{ form.specify.profile.name }} <br />
                    프로필 이미지 :
                    <img
                      :src="form.specify.profile.profileImg"
                      alt="이미지를 불러올 수 없습니다"
                    />
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
            <v-container>
              <v-row>
                <v-col cols="12" align-self="center">
                  <h2>처리 상태</h2>
                  <v-radio-group v-model="form.status" row>
                    <v-radio
                      v-for="n in statusRadio"
                      :key="n.value"
                      :label="`${n.text}`"
                      :value="n.value"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-container>
            <v-container>
              <v-row align="center" justify="space-around">
                <v-col cols="12">
                  <v-btn
                    elevation="2"
                    depressed
                    color="primary"
                    @click="updateReport()"
                    >확인</v-btn
                  >
                  <v-btn
                    elevation="2"
                    depressed
                    color="error"
                    @click="dialog = false"
                    >취소</v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-dialog>
      </div>
    </template>
  </div>
</template>

<script>
import { getReports, getReport, updateReportStatus } from '@/api/admin/report'
import { getMember } from '@/api/admin/member'
import { getReview } from '@/api/admin/review'
import { getPost } from '@/api/admin/post'

export default {
  name: 'Report',
  data: () => ({
    page: 1,
    size: 10,
    length: 10,
    dialog: false,
    statusRadio: [
      {
        text: '승인',
        value: 'APPROVED',
      },
      {
        text: '미승인',
        value: 'NOT_APPROVED',
      },
    ],
    headers: [
      {
        text: '신고자',
        align: 'left',
        sortable: false,
        value: 'email',
      },
      { text: '제목', value: 'title' },
      { text: '내용', value: 'content' },
      { text: '신고유형', value: 'type' },
      { text: '처리상태', value: 'status' },
    ],
    data: [],
    selectedReport: {},
    condition: {
      title: '',
      reportStatus: '',
    },
    editedIndex: -1,
    editedItem: {
      email: '',
      title: '',
      content: '',
      type: '',
      status: '',
    },
    form: {
      reportId: '',
      type: '',
      email: '',
      title: '',
      content: '',
      specify: {
        profile: {
          email: '',
          name: '',
          nickName: '',
          profileImg: '',
        },
        review: {
          email: '',
          name: '',
          nickName: '',
          content: '',
        },
        post: {
          email: '',
          name: '',
          nickName: '',
          title: '',
          content: '',
        },
      },
      status: '',
    },
    defaultItem: {
      email: '',
      title: '',
      content: '',
      type: '',
      status: '',
    },
    selectItems: [
      { text: '처리', value: 'APPROVED' },
      { text: '미처리', value: 'NOT_APPROVED' },
      { text: '모두', value: '' },
    ],
  }),

  computed: {},

  watch: {
    dialog(val) {
      val || this.close()
    },
    page() {
      this.getReportList()
    },
  },

  // created() {
  //   this.initialize()
  // },

  methods: {
    getColor() {
      return 'red'
    },
    searchWithSelect(approved) {
      this.condition.reportStatus = approved
      this.search()
    },
    searchIfPressEnter(event) {
      let key = event.key || event.keyCode

      if (key == 'Enter' || key == 13) {
        this.search()
      }
    },
    search() {
      this.page = 1
      this.getReportList()
    },
    showModal(id) {
      const result = getReport(id)
      console.log(result)
      result.then(value => {
        let result = value.data
        this.form.id = result.id
        this.form.type = result.type
        this.form.title = result.title
        this.form.email = result.member.email
        this.form.content = result.content
        this.form.status = result.status

        console.log(result.type)

        let closer = this.form
        if (result.type == 'PROFILE') {
          const requestMember = getMember(result.reportedMember.id)
          requestMember.then(p => {
            closer.specify.profile.email = p.data.email
            closer.specify.profile.name = p.data.name
            closer.specify.profile.nickName = p.data.nickName
            closer.specify.profile.profileImg = p.data.profileImg
          })
        } else if (result.type == 'REVIEW') {
          const requestReview = getReview(result.review.id)
          requestReview.then(r => {
            let review = r.data
            closer.specify.review.email = review.member.email
            closer.specify.review.name = review.member.name
            closer.specify.review.nickName = review.member.nickName
            closer.specify.review.content = review.content
          })
        } else if (result.type == 'POST') {
          let requestPost = getPost(result.post.id)

          requestPost.then(p => {
            let post = p.data
            closer.specify.post.email = post.member.email
            closer.specify.post.name = post.member.name
            closer.specify.post.nickName = post.member.nickName
            closer.specify.post.content = post.content
            closer.specify.post.title = post.title
          })
        }
      })
      this.dialog = true
    },
    updateReport() {
      try {
        // console.log(this.form.status)
        const result = updateReportStatus(this.form.id, this.form.status)
        result.then(d => {
          if (d.status.toString().startsWith('2')) {
            this.$toastSuccess('처리하였습니다')
            // 리스트 데이터의 상태 변경
            this.data.filter(s => s.id == this.form.id)[0].status = {
              NOT_APPROVED: '<span class="secondary-wine-2">미승인</span>',
              APPROVED: '<span class="brand-primary-blue">승인</span>',
            }[this.form.status]
          }
        })
        // $toastSuccess
        // console.log(result)
      } catch (e) {
        console.log(e)
      }
      // modal close
      this.dialog = false
    },
    singleSelect(event) {
      console.log(event)
    },
    initialize(gotData) {
      this.data = []
      if (gotData.length == 0) {
        return
      }
      for (let d of gotData) {
        this.data.push({
          id: d.id,
          email: d.member.email,
          title: d.title,
          content: d.content,
          type: { PROFILE: '프로필', REVIEW: '리뷰', POST: '포스트' }[d.type],
          status: {
            NOT_APPROVED: '<span class="secondary-wine-2">미승인</span>',
            APPROVED: '<span class="brand-primary-blue">승인</span>',
          }[d.status],
        })
      }
    },
    getReportList() {
      let result = getReports(
        this.page - 1,
        this.size,
        this.condition.title,
        this.condition.reportStatus,
      )
      result.then(value => {
        console.log(value.data)
        this.length = value.data.totalPages
        this.initialize(value.data.content)
      })
    },
    editItem(item) {
      this.editedIndex = this.data.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem(item) {
      const index = this.data.indexOf(item)
      confirm('Are you sure you want to delete this item?') &&
        this.data.splice(index, 1)
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.data[this.editedIndex], this.editedItem)
      } else {
        this.data.push(this.editedItem)
      }
      this.close()
    },
  },
  mounted() {
    this.getReportList()
  },
}
</script>

<style scoped>
.admin-content {
  width: 930px;
}

.p-focus {
  cursor: pointer;
}
</style>
