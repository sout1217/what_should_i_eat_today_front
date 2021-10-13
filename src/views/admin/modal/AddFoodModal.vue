<template>
  <v-dialog v-model="dialog" max-width="880" @click:outside="closeModal">
    <v-card class="pa-16">
      <v-card-title class="h1"> 카테고리에 음식 추가하기 </v-card-title>

      <v-card-text class="mt-5">
        <v-row>
          <v-col cols="2">
            <v-select
              label="국가"
              hide-details
              outlined
              class="b3"
              dense
              v-model="formData.country"
              :items="form.countries"
            />
          </v-col>
          <v-col cols="2">
            <v-select
              label="태그"
              hide-details
              outlined
              class="b3"
              dense
              v-model="formData.tag"
              :items="form.tags"
            />
          </v-col>
          <v-col cols="8">
            <v-text-field
              class="v-btn--block"
              v-model="formData.search"
              outlined
              hide-details
              dense
              placeholder="검색"
              autocomplete="off"
              @keydown.enter="searchReadDataFromAPI"
            >
              <v-icon
                @click="searchReadDataFromAPI"
                slot="append"
                color="black"
              >
                mdi-magnify
              </v-icon>
            </v-text-field>
          </v-col>
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
              single-expand
              @item-selected="checking"
            >
              <template v-slot:item.tags="{ item }">
                {{ item.tags.map(tag => tag.name) | join }}
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-row>
          <v-col cols="12">
            <v-pagination
              total-visible="11"
              v-model="table.page"
              :length="table.totalPages"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AddFoodModal',
  props: {
    dialog: {
      type: Boolean,
      value: false,
      require: true,
    },
    categoryId: {
      require: true,
    },
  },
  data() {
    return {
      form: {
        countries: [],
        tags: [],
        changed: false,
      },
      formData: {
        country: '',
        tag: '',
        search: '',
      },
      table: {
        selected: [],
        foods: /** id, name, country, foodTags */ [],
        page: 1,
        numberOfElements: 10,
        totalPages: 1,
        options: {},
        headers: [
          { text: '번호', value: 'id' },
          { text: '음식명', value: 'name' },
          { text: '국가', value: 'country' },
          { text: '태그', value: 'tags' },
        ],
      },
    }
  },
  methods: {
    /** 모달창 닫기 */
    closeModal() {
      this.$emit('closeModal')
    },
    /** table 데이터 세팅하기 */
    setTableData(data) {
      console.log(data)

      const { content: foods, number: page, totalPages } = data

      // todo : 2021-10-11 : 해당 음식을 체크박스에서 체크하기 위해 카테고리 정보 또한 포함해서 주어야 함
      // 음식의 카테고리 중 해당 카테고리가 있는 경우 체크
      this.table.selected.push(...foods.filter(food => food.check))

      this.table.foods = foods
      this.table.page = page + 1
      this.table.totalPages = totalPages
    },
    /** api 조회하기 */
    readDataFromAPI(init) {
      console.log('this table page', this.table.page)

      const formData = {
        country: this.formData.country === '전체' ? '' : this.formData.country,
        tag: this.formData.tag === '전체' ? '' : this.formData.tag,
        search: this.formData.search,
        categoryId: this.categoryId,
      }

      // 음식 조회
      this.$store
        .dispatch('GET_FOODS_WITH_TAGS_AND_COUNTRY', {
          formData,
          page: init ? 0 : this.table.page - 1,
          size: 10,
        })
        .then(foodsPage => {
          this.setTableData(foodsPage)
        })
        .catch(error => {
          this.$toastError(error)
        })

      // 국가 조회
      this.$store
        .dispatch('GET_COUNTRY')
        .then(countries => {
          console.log(countries)
          this.form.countries = ['전체'].concat(countries.map(c => c.name))
        })
        .catch(error => this.$toastError(error))

      // 태그 조회 (태그를 클릭했을 질문을 가져올지 정하기)
      this.$store
        .dispatch('GET_TAGS')
        .then(tags => {
          console.log(tags)
          this.form.tags = ['전체'].concat(tags.map(t => t.name))
        })
        .catch(error => this.$toastError(error))

      this.form.changed = false
    },
    /** 음식 체크 이벤트
     * item { Object } 체크된 음식 { id, name, check, country }
     * value { boolean } 체크 박스 값
     * */
    checking(data) {
      const param = {
        categoryId: this.categoryId,
        foodId: data.item.id,
        check: data.value,
      }

      this.$store.dispatch('UPDATE_FOOD_CATEGORY_MAPPING', param)
    },
    searchReadDataFromAPI() {
      this.readDataFromAPI(true)
    },
  },
  watch: {
    /** 모달이 오픈될 때 api 조회하기 */
    dialog(newValue) {
      if (newValue) {
        this.readDataFromAPI()
      }
    },
    'table.page': {
      handler() {
        this.readDataFromAPI()
      },
    },
    /** 검색 태그 선택 또는 국가 선택 또는 검색어를 입력한 경우 페이지를 1로 세팅여부를 위함 */
    'formData.tag': {
      immediate: true,
      handler() {
        this.table.page = 0
      },
    },
    'formData.country': {
      immediate: true,
      handler() {
        this.table.page = 0
      },
    },
  },
}
</script>

<style scoped></style>
