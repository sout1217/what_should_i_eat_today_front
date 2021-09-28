<template>
  <v-row class="fill-height px-lg-16" align="center">
    <v-col cols="12">
      <v-row align="center" class="mb-4">
        <v-col cols="12" sm="auto" md="auto">
          <h1>카테고리 목록</h1>
        </v-col>
        <v-spacer />
        <v-col cols="12" sm="12" md="3">
          <v-text-field
            class="v-btn--block something"
            v-model="search"
            outlined
            hide-details
            dense
            placeholder="검색"
            autocomplete="off"
            @keydown.enter="readDataFromAPI"
          >
            <v-icon @click="readDataFromAPI" slot="append" color="black">
              mdi-magnify
            </v-icon>
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="auto">
          <v-btn
            link
            :to="{ name: 'CategoryWrite' }"
            class="v-btn--block"
            color="primary"
          >
            <h5>등록하기</h5>
          </v-btn>
        </v-col>
        <v-col cols="12" sm="6" md="auto">
          <v-btn @click="deleteCategories" class="v-btn--block" color="error">
            <h5>삭제하기</h5>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-data-table
            v-model="selected"
            :calculate-widths="true"
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
            hide-default-footer
            :search="search"
            :header-props="headerProp"
            class="elevation-1"
            dense
          >
            <template v-slot:item.name="{ item }">
              <v-btn text color="primary" @click="toCategoryDetailsPage(item)">
                {{ item.name }}
              </v-btn>
            </template>

            <!-- https://luerangler-dev.tistory.com/34 참고-->
            <template v-slot:item.admin="{ item }">
              {{ item.admin.email || '작성자 없음' }}
            </template>

            <!-- 시작 -->
            <template v-slot:item.visible="props">
              <v-edit-dialog
                :return-value.sync="props.item.visible"
                @save="save(props.item)"
                @cancel="cancel(props.item)"
                @open="open(props.item)"
                @close="close(props.item)"
                large
                save-text="저장"
                cancel-text="취소"
              >
                {{ props.item.visible | visibleFilter }}
                <template v-slot:input>
                  <v-switch hide-details v-model="props.item.visible" />
                </template>
              </v-edit-dialog>
            </template>
            <!-- 종료 -->

            <template v-slot:item.createdAt="{ item }">
              {{ item.createdAt | yyyymmdd }}
            </template>

            <template v-slot:item.updatedAt="{ item }">
              {{ item.updatedAt | yyyymmdd }}
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-pagination
            total-visible="11"
            v-model="page"
            :length="totalPage"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import categoriesApi from '@/api/admin/categories'

export default {
  name: 'CategoryListPage',
  data() {
    return {
      noDataText: '데이터가 없습니다',
      selected: [],
      search: '',
      page: 1,
      totalPage: 10,
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
      headerProp: {
        sortByText: '정렬기준',
      },
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
    async readDataFromAPI() {
      // 이전에 선택한 카테고리들을 초기화하기 위함
      // 1. 카테고리 선택 후 다음 페이지 또는 이전 페이지로 이동했을 때
      // 2. 카테고리를 삭제후 다시 재삭제 할 때
      this.selected = []
      this.loading = true

      // page, size
      const { page, itemsPerPage } = this.options
      let pageNumber = page - 1

      categoriesApi
        .getCategories(pageNumber, itemsPerPage, this.search)
        /**
         * @typedef Categories
         * @property { Array<Object> } content
         * @property { number } totalElements
         * @property { number } numberOfElements
         * @property { number } totalPages
         */
        /** @type Categories */
        .then(({ data }) => {
          console.log(data)
          this.loading = false

          this.categories = this.itemSort(data.content)
          this.totalElements = data.totalElements
          this.numberOfElements = data.numberOfElements
          this.totalPage = data.totalPages
        })
        .catch(error => {
          this.errorPrint(error)
        })
    },

    /** 카테고리들 정렬 */
    itemSort(content) {
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

    /** 카테고리 삭제하기 */
    deleteCategories() {
      if (this.selected.length < 1)
        return this.$toastWarning('1건 이상 선택해주세요')

      const categoryIds = this.selected.map(category => category.id)
      console.log('categoryIds -> ', categoryIds)

      categoriesApi
        .deleteAllById(categoryIds)
        .then(() => {
          this.readDataFromAPI()
          this.$toastSuccess(`총 ${categoryIds.length}건 삭제되었습니다`)
        })
        .catch(error => {
          this.$toastError(error)
        })
    },
    save(item) {
      console.log('save', item.visible)
      const { id, visible } = item

      categoriesApi
        .updateVisibleOfCategory({ id, visible })
        .then(() => {
          this.$toastSuccess('수정되었습니다')
        })
        .catch(error => {
          this.$toastError(error)
        })
    },
    cancel(item) {
      console.log('cancel', item.visible)
    },
    open(item) {
      console.log('open', item.visible)
    },
    close(item) {
      console.log('close', item.visible)
    },
    test() {
      alert('test')
    },
    toCategoryDetailsPage({ id }) {
      console.log(id)
      this.$router.push({ name: 'CategoryDetails', params: { id } })
    },
  },
}
</script>

<style scoped></style>
