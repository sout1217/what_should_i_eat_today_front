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
              :single-select="true"
            >
              <template v-slot:item.title="{ item }">
                <span @click="showModal(item.id)">{{ item.title }}</span>
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
            <v-card-title class="text-h5 grey lighten-2">
              Privacy Policy
            </v-card-title>

            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">
                I accept
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>
  </div>
</template>

<script>
import { getReports, getReport } from '@/api/admin/report'

export default {
  name: 'Report',
  data: () => ({
    page: 1,
    size: 10,
    length: 10,
    dialog: false,
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
      result.then(value => {
        console.log(value.data)
      })
      this.dialog = true
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
</style>
