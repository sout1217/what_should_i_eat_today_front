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
            <v-form @submit.prevent="submit">
              <div class="mb-3">
                <label class="t1">카테고리명</label>
                <validation-provider
                  rules="required|limit:1,30"
                  name="카테고리명"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    dense
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
                <v-btn small :class="editClass"> 수정 </v-btn>
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
import categoriesApi from '@/api/admin/categories'
import foodApi from '@/api/admin/foods'

export default {
  name: 'CategoryDetailsPage',
  data() {
    return {
      apiLoaded: false,
      isUpdated: false,
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
  watch: {
    formData: {
      deep: true, // 자식 속성까지 watch 로 감시 - 객체의 중첩된 변경 감지
      immediate: true, // 현재 값으로 즉시 핸들러 트리거
      handler: function (newVal, oldVal) {
        if (this.apiLoaded) {
          console.log(newVal, oldVal)
          this.isUpdated = true
        }
      },
    },
  },
  methods: {
    readDataFromAPI() {
      categoriesApi
        .getCategory(this.categoryId)
        .then(({ data }) => {
          console.log('category -> ', data)
          const { name, description } = data
          this.formData.name = name
          this.formData.description = description

          setTimeout(() => {
            this.apiLoaded = true
          }, 0)

          return foodApi.getFoodsByCategory(0, 3, this.categoryId)
        })
        .then(({ data }) => {
          console.log('foods -> ', data)
          const { content: foods } = data
          this.table.foods = foods
        })
        .catch(error => this.$toastError(error))
    },
    moreFoods() {
      console.log('more food')
      console.log(this.table.page)
      console.log(this.table.numberOfElements)
      // categoriesApi.getCategories()
    },
  },
  computed: {
    categoryId() {
      return this.$route.params.id
    },
    editClass() {
      return {
        primary: true,
        'lighten-3': !this.isUpdated,
      }
    },
  },
  mounted() {
    this.readDataFromAPI()
  },
}
</script>

<style scoped></style>
