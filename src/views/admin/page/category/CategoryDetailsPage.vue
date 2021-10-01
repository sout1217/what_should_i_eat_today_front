<template>
  <v-row class="fill-height px-lg-16" align="center" justify="center">
    <v-col cols="12">
      <v-row>
        <v-col cols="auto">
          <h1>카테고리 상세</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <validation-observer ref="observer">
            <v-form>
              <div class="mb-3">
                <label class="t1">카테고리명</label>
                <validation-provider
                  rules="required|limit:1,30"
                  name="카테고리명"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    dense
                    disabled
                    :error-messages="errors"
                    v-model="formData.name"
                    outlined
                    placeholder="내용을 입력해주세요"
                    autocomplete="off"
                  ></v-text-field>
                </validation-provider>
              </div>

              <div class="mb-3">
                <validation-provider
                  rules="required|limit:2,255"
                  name="상세정보"
                  v-slot="{ errors }"
                >
                  <label class="t1">상세정보</label>
                  <v-textarea
                    dense
                    rows="1"
                    auto-grow
                    v-model="formData.description"
                    outlined
                    :error-messages="errors"
                    placeholder="내용을 입력해주세요"
                  />
                </validation-provider>
              </div>

              <!--        <label class="t1">생성일</label>-->
              <!--        <v-text-field v-model="form.detail" outlined />-->

              <div class="mb-3">
                <validation-provider
                  name="노출 여부"
                  rules="required-select"
                  v-slot="{ errors }"
                >
                  <label class="t1">노출 여부</label>
                  <v-radio-group
                    dense
                    v-model="formData.visible"
                    required
                    row
                    :error-messages="errors"
                    class="pl-2"
                  >
                    <v-radio label="노출" :value="true"></v-radio>
                    <v-radio label="숨김" :value="false"></v-radio>
                  </v-radio-group>
                </validation-provider>
              </div>

              <v-row align="center" no-gutters style="gap: 0 8px" class="">
                <label class="t1">음식 리스트</label>
                <v-spacer />
                <v-btn small class="success"> 카테고리 음식 추가하기 </v-btn>
                <v-btn small class="primary" @click="updateCategory">
                  수정
                </v-btn>
                <v-btn small class="error"> 삭제 </v-btn>
                <v-btn small class="secondary lighten-2"> 취소 </v-btn>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-data-table
                    dense
                    v-model="table.selected"
                    show-select
                    :page="table.page"
                    :pageCount="table.numberOfElements"
                    :headers="table.headers"
                    hide-default-footer
                    :options="table.options"
                    :items="table.foods"
                  >
                    <!-- todo : 2021.09.29 코드 개선 필요 -->
                    <template v-slot:item.foodTags="{ item }">
                      {{ item.foodTags.map(tag => tag.name) | join }}
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>

              <v-row no-gutters class="mt-1">
                <v-col>
                  <v-btn small @click="moreFoods" block rounded>
                    <v-icon small>mdi-plus</v-icon>
                    <span class="c1">더보기</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </validation-observer>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CategoryDetailsPage',
  data() {
    return {
      formData: {
        name: '',
        description: '',
        visible: null,
      },
      table: {
        selected: [],
        foods: /** id, name, country, foodCategories, foodTags */ [],
        page: 10,
        numberOfElements: 10,
        options: {},
        headers: [
          { text: '번호', value: 'id' },
          { text: '음식명', value: 'name' },
          { text: '국가', value: 'country' },
          { text: '카테고리', value: 'foodCategories' },
          { text: '태그', value: 'foodTags' },
        ],
      },
    }
  },
  methods: {
    /** 현재 페이지 데이터 가져오기 */
    readDataFromAPI() {
      const { id: categoryId } = this.$route.params

      this.$store
        .dispatch('FIND_CATEGORIES_BY_ID', categoryId)
        .then(category => {
          this.formData = { ...category }
        })
        .catch(error => {
          this.$toastError(error)
        })

      this.$store
        .dispatch('FIND_FOODS_BY_CATEGORY_ID', { categoryId, page: 0, size: 3 })
        .then(foodsPage => {
          console.log('fp->', foodsPage)
          const { content: foods, number: page } = foodsPage

          this.updateFoodsTable(foods, page)
        })
        .catch(error => this.$toastError(error))
    },
    /** 현재 카테고리에 관련된 음식 더 가져오기 */
    moreFoods() {
      const { id: categoryId } = this.$route.params

      const increasedPage = this.table.options.page + 1

      this.$store
        .dispatch('FIND_FOODS_BY_CATEGORY_ID', {
          categoryId,
          page: increasedPage,
          size: 3,
        })
        .then(foodsPage => {
          const { content: foods, number: page } = foodsPage

          if (foods.length < 1)
            return this.$toastWarning('더 이상 음식이 존재하지 않습니다')

          this.updateFoodsTable(foods, page)
        })
        .catch(error => this.$toastError(error))
    },

    /** 음식 테이블 변경하기 */
    updateFoodsTable(foods, page) {
      this.table.foods.push(...foods)
      this.table.options.page = page
    },
    /** 카테고리 수정하기 */
    updateCategory() {
      const { id: categoryId } = this.$route.params

      this.$refs.observer
        .validate()
        .then(() => {
          return this.$store.dispatch('UPDATE_CATEGORY', {
            categoryId,
            ...this.formData,
          })
        })
        .then(() => {
          this.$toastSuccess('수정되었습니다')
        })
        .catch(error => {
          this.$toastError(error)
        })
    },
  },
  mounted() {
    this.readDataFromAPI()
  },
}
</script>

<style scoped></style>
