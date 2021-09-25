<template>
  <v-row class="fill-height" align-content="center">
    <v-col>
      <h3 class="mb-5">카테고리 목록</h3>
      <!--      <v-list-item v-for="(category, index) in categories" :key="index">-->
      <!--        {{ category.name }}-->
      <!--      </v-list-item>-->

      <v-data-table
        show-select
        :page="page"
        :pageCount="numberOfElements"
        :headers="headers"
        :items="categories"
        :options.sync="options"
        :server-items-length="totalElements"
        :loading="loading"
        loading-text="로딩 중..."
        :no-data-text="noDataText"
        class="elevation-1"
      >
        <!-- https://luerangler-dev.tistory.com/34 참고-->
        <template v-slot:item.admin="{ item }">
          {{ item.admin || '작성자 없음' }}
        </template>

        <template v-slot:item.visible="{ item }">
          {{ item.visible | visibleFilter }}
        </template>

        <template v-slot:item.createdAt="{ item }">
          {{ item.createdAt | yyyymmdd }}
        </template>

        <template v-slot:item.updatedAt="{ item }">
          {{ item.updatedAt | yyyymmdd }}
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import categoriesApi from '@/api/categories'

export default {
  name: 'CategoryListPage',
  data() {
    return {
      noDataText: '데이터가 없습니다',
      page: 1,
      totalElements: 0,
      numberOfElements: 0,
      categories: [],
      loading: true,
      options: {},
      headers: [
        { text: '카테고리명', value: 'name' },
        { text: '설명', value: 'description' },
        { text: '작성자', value: 'admin' },
        { text: '노출여부', value: 'visible' },
        { text: '생성일', value: 'createdAt' },
        { text: '수정일', value: 'updatedAt' },
      ],
    }
  },
  // 이것은 사용자가 현재 페이지를 변경할 때 새 데이터 세트를 채웁니다.
  watch: {
    options: {
      handler() {
        this.readDataFromAPI()
      },
    },
    deep: true,
  },
  methods: {
    /** 카테고리 조회 */
    //Reading data from API method.
    async readDataFromAPI() {
      this.loading = true

      // page, size
      const { page, itemsPerPage } = this.options
      let pageNumber = page - 1

      categoriesApi
        .getCategories(pageNumber, itemsPerPage)
        /**
         * @typedef Categories
         * @property { Array<Object> } content
         * @property { number } totalElements
         * @property { number } numberOfElements
         */
        /** @type Categories */
        .then(({ data }) => {
          console.log(data)
          this.loading = false

          this.categories = this.itemSlicing(data.content)
          this.totalElements = data.totalElements
          this.numberOfElements = data.numberOfElements
        })
        .catch(error => {
          this.errorPrint(error)
        })
    },

    /** 카테고리들 정렬 */
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

    /** 에러 메시지 출력하기 */
    errorPrint(error) {
      this.loading = false
      this.noDataText = error.message
    },
  },
}
</script>

<style scoped></style>
