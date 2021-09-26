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
              <!--키 값을 명시해 주어야 만, select 시 1개만 정상 select 됩니다. -->
              <template v-slot:items="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.calories }}</td>
                <td class="text-xs-right">{{ props.item.fat }}</td>
                <td class="text-xs-right">{{ props.item.carbs }}</td>
                <td class="text-xs-right">{{ props.item.protein }}</td>
                <td class="justify-center layout px-0">
                  <v-icon small class="mr-2" @click="editItem(props.item)">
                    edit
                  </v-icon>
                  <v-icon small @click="deleteItem(props.item)">
                    delete
                  </v-icon>
                </td>
              </template>
              <!--<template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>-->
            </v-data-table>
          </v-col>
          <v-col cols="12">
            <v-pagination v-model="page" :length="length"></v-pagination>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { getReports } from '@/api/admin/report'

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
        value: 'id',
      },
      { text: '제목', value: 'title' },
      { text: '내용', value: 'content' },
      { text: '신고유형', value: 'type' },
      { text: '처리상태', value: 'status' },
    ],
    data: [],
    condition: {
      title: '',
      reportStatus: '',
    },
    editedIndex: -1,
    editedItem: {
      id: '',
      title: '',
      content: '',
      type: '',
      status: '',
    },
    defaultItem: {
      id: '',
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
          id: d.member.email,
          title: d.title,
          content: d.content,
          type: { PROFILE: '프로필', REVIEW: '리뷰', POST: '포스트' }[d.type],
          status: { NOT_APPROVED: '미승인', APPROVED: '승인' }[d.status],
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
