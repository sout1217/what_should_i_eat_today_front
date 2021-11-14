<template>
  <v-dialog v-model="dialog" max-width="880" @click:outside="closeModal">
    <v-card class="pa-16">
      <v-card-title class="h1"> 음식 등록 </v-card-title>

      <v-card-text class="mt-5">
        <v-row class="mb-3" justify="center" no-gutters>
          <v-col cols="12" sm="12"
            ><v-card-title class="pb-0 pl-0"> 음식명 </v-card-title></v-col
          >
        </v-row>
        <v-row justify="center">
          <v-col cols="12" sm="12">
            <v-text-field
              class="pt-0"
              v-model="form.title"
              placeholder="음식명을 입력하세요"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text class="mt-5">
        <v-row class="mb-3" justify="center" no-gutters>
          <v-col cols="12" sm="12"
            ><v-card-title class="pb-0 pl-0"> 태그 </v-card-title></v-col
          >
        </v-row>
        <v-row justify="center">
          <v-col cols="12" sm="12">
            <v-text-field
              class="pt-0"
              v-model="form.title"
              placeholder="음식명을 입력하세요"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text class="mt-5">
        <v-row class="mb-3" justify="center" no-gutters>
          <v-col cols="12" sm="12"
            ><v-card-title class="pb-0 pl-0"> 태그 </v-card-title></v-col
          >
        </v-row>
        <v-row justify="center">
          <v-col cols="12" sm="12">
            <TagCombobox></TagCombobox>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text class="mt-5">
        <v-row class="mb-3" justify="center" no-gutters>
          <v-col cols="12" sm="1"
            ><v-btn
              class="system-error grayscale-white--text"
              @click="okAction"
            >
              <span class="t2">{{ ok }}</span>
            </v-btn>
            <v-btn
              v-if="no"
              class="system-success grayscale-white--text"
              @click="cancelAction"
            >
              <span class="t2">{{ no }}</span>
            </v-btn></v-col
          >
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import TagCombobox from '@/views/components/common/search/TagCombobox'
export default {
  name: 'AddFoodModal',
  components: {
    TagCombobox,
  },
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
  methods: {},
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
