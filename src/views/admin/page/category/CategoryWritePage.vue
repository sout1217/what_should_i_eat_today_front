<template>
  <v-row class="fill-height px-lg-16" align="center" justify="center">
    <v-col cols="12">
      <v-row>
        <v-col cols="auto">
          <h1 class="mb-5">카테고리 등록</h1>
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
                    v-model="formData.description"
                    outlined
                    :error-messages="errors"
                    placeholder="내용을 입력해주세요"
                  />
                </validation-provider>
              </div>

              <!--        <label class="t1">생성일</label>-->
              <!--        <v-text-field v-model="form.detail" outlined />-->

              <div class="mb-4">
                <validation-provider
                  name="노출 여부"
                  rules="required-select"
                  v-slot="{ errors }"
                >
                  <label class="t1">노출 여부</label>
                  <v-radio-group
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

              <!-- :disabled="invalid" -->
              <div class="text-right">
                <v-btn class="primary mr-4" type="submit"> 등록 </v-btn>
                <v-btn
                  class="primary"
                  @click="hasHistory() ? $router.go(-1) : $router.push('/')"
                >
                  취소
                </v-btn>
              </div>
            </v-form>
          </validation-observer>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import categoriesApi from '@/api/admin/categories'

export default {
  name: 'CategoryWritePage',
  data() {
    return {
      formData: {
        name: '',
        description: '',
        visible: null,
      },
    }
  },
  methods: {
    submit() {
      this.$refs.observer.validate().then(async result => {
        if (result) {
          try {
            await categoriesApi.create(this.formData)
            await this.$router.push({ name: 'CategoryList' })
            this.$toastSuccess('등록되었습니다')

            /** @param {Error} error */
          } catch (error) {
            this.$toastError(error)
          }
        }
      })
    },
    hasHistory() {
      return history.length > 2
    },
  },
}
</script>

<style scoped></style>
