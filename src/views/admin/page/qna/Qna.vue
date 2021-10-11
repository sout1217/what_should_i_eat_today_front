<template>
  <v-container class="fill-height" fluid>
    <v-row class="fill-height px-lg-16" align="center">
      <v-col cols="12">
        <v-row align="center" class="mb-4">
          <v-col cols="12" sm="auto" md="auto">
            <h1>Qna 관리</h1>
          </v-col>
          <v-spacer />
          <v-col cols="12" sm="12" md="3">
            <v-text-field
              class="v-btn--block something"
              v-model="condition.title"
              outlined
              hide-details
              dense
              placeholder="검색"
              autocomplete="off"
            >
              <v-icon slot="append" color="black"> mdi-magnify </v-icon>
            </v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-data-table
              :calculate-widths="true"
              :page="page"
              :pageCount="numberOfElements"
              :headers="headers"
              :items="items"
              :server-items-length="totalElements"
              :loading="loading"
              loading-text="로딩 중..."
              :no-data-text="noDataText"
              :search="condition.title"
              hide-default-footer
              class="elevation-1"
            >
              <template v-slot:item.id="{ item }">
                {{ item.id }}
              </template>

              <template v-slot:item.type="{ item }">
                {{ item.type }}
              </template>

              <template v-slot:item.title="{ item }">
                {{ item.title }}
              </template>

              <template v-slot:item.status="{ item }">
                {{ item.status }}
              </template>
            </v-data-table>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-pagination
              total-visible="11"
              v-model="page"
              :length="size"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getQnas } from '@/api/admin/qna'

export default {
  name: 'QnaList',
  data() {
    return {
      noDataText: '데이터가 없습니다',
      condition: {
        title: '',
        status: '',
      },
      page: 1,
      size: 10,
      totalElements: 0,
      numberOfElements: 0,
      items: [],
      loading: true,
      options: {},
      headers: [
        { text: 'ID', value: 'id' },
        { text: '질문 유형', value: 'type' },
        { text: '질문 제목', value: 'title' },
        { text: '처리 상태', value: 'status' },
      ],
      headerProp: {
        sortByText: '정렬기준',
      },
    }
  },
  methods: {
    search() {},
    initData() {
      getQnas(
        this.page,
        this.size,
        this.condition.title,
        this.condition.status,
      ).then(({ data }) => {
        this.items = []
        if (data.length == 0) {
          return
        }
        for (let d of data) {
          this.data.push({
            id: d.id,
            type: d.type,
            title: d.title,
            status: {
              NOT_APPROVED: '<span class="secondary-wine-2">미승인</span>',
              APPROVED: '<span class="brand-primary-blue">승인</span>',
            }[d.status],
          })
        }
        console.log(data)
      })
    },
    itemSlicing(content) {
      const { sortBy, sortDesc } = this.options

      let items = content

      if (sortBy.length === 1 && sortDesc.length === 1) {
        items = items.sort((a, b) => {
          const sortA = a[sortBy[0]]
          const sortB = b[sortBy[0]]

          if (sortDesc[0]) {
            if (sortA < sortB) return 1
            if (sortA > sortB) return -1
            return 0
          } else {
            if (sortA < sortB) return -1
            if (sortA > sortB) return 1
            return 0
          }
        })
      }
      return items
    },
    errorPrint(error) {
      this.loading = false
      this.noDataText = error.message
    },
  },
  mounted() {
    this.initData()
  },
}
</script>

<style scoped></style>
