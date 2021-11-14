<template>
  <v-container fluid class="pb-0">
    <v-row class="px-lg-16 mb-5 mb-md-0">
      <!-- left 00-->
      <v-col cols="12" md="5" class="pr-6">
        <v-card class="transparent" flat>
          <v-dialog
            id="test"
            overlay-color="#000"
            overlay-opacity="0.9"
            v-model="imgDialog"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-img
                v-on="on"
                v-bind="attrs"
                id="current-post-img"
                class="rounded-xl pointer"
                v-ripple="{ class: 'secondary-orange-1' }"
                :src="post.imagePath"
                :alt="post.imageName"
                :aspect-ratio="16 / 11"
              />
            </template>
            <v-img
              @click="imgDialog = false"
              width="90%"
              height="80vh"
              contain
              class="mx-auto pointer elevation-0"
              :src="post.imagePath"
              :alt="post.imageName"
            />
          </v-dialog>
          <v-card-text class="b1 pt-2 pb-0 d-flex align-center">
            <div class="flex-grow-1">
              {{ post.food.name }}
            </div>
            <div>
              <v-tooltip nudge-bottom="12" top color="bg-grayscale-black-1">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn @click="doLike(post)" icon v-bind="attrs" v-on="on">
                    <v-icon v-if="post.first" color="red lighten-1">
                      mdi-heart
                    </v-icon>
                    <v-icon v-else color="red lighten-1">
                      mdi-heart-outline
                    </v-icon>
                  </v-btn>
                </template>
                <div class="tooltip b3 d-flex flex-column align-center">
                  <div>좋아요</div>
                </div>
                <div>{{ post.numberOfLikes | oneThousand }}</div>
              </v-tooltip>
              <v-tooltip nudge-bottom="12" top color="bg-grayscale-black-1">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn @click="doRating(post)" icon v-bind="attrs" v-on="on">
                    <v-icon v-if="post.second" color="orange lighten-2">
                      mdi-star
                    </v-icon>
                    <v-icon v-else color="orange lighten-2">
                      mdi-star-outline
                    </v-icon>
                  </v-btn>
                </template>
                <div class="tooltip b3 d-flex flex-column align-center">
                  <div>평점</div>
                  <div>0</div>
                </div>
              </v-tooltip>
              <v-tooltip nudge-bottom="12" top color="bg-grayscale-black-1">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="doFavorite(post)"
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon v-if="post.third" color="#5F5FC4">
                      mdi-check
                    </v-icon>
                    <v-icon v-else color="grey">mdi-plus</v-icon>
                  </v-btn>
                </template>
                <div class="tooltip b3 d-flex flex-column align-center">
                  <div>찜</div>
                  <div>{{ post.numberOfFavorites | oneThousand }}</div>
                </div>
              </v-tooltip>
            </div>
          </v-card-text>
          <v-card-actions class="pt-0 px-4">
            <v-chip-group column>
              <v-chip
                color="bg-grayscale-black-3"
                text-color="grayscale-black-6"
                label
                small
                v-for="category in post.food.foodCategories"
                :key="category.id"
              >
                <span class="b2 font-weight-light">
                  {{ category.name }}
                </span>
              </v-chip>
            </v-chip-group>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- right -->
      <v-col cols="12" md="7" class="pl-6 pt-5">
        <v-row align="baseline" class="mb-8" no-gutters>
          <h1 class="mr-4">{{ post.title }}</h1>
          <h6
            class="b3 grayscale-black-5 font-weight-light"
            :title="post.createdAt | yyyymmddhhmmss"
          >
            {{ post | to }}
          </h6>
          <v-spacer />
          <h6 v-if="post.member.name == $store.state.me.name">
            <v-btn x-small plain link :ripple="false">
              <div class="b3 primary--text font-weight-light d-flex center">
                <v-icon small class="mr-1"> mdi-pencil</v-icon>
                수정
              </div>
            </v-btn>
            <v-btn x-small plain link :ripple="false">
              <div
                class="
                  b3
                  red--text
                  text--lighten-1
                  font-weight-light
                  d-flex
                  center
                "
              >
                <v-icon small class="mr-1" @click="deletePost(post)">
                  mdi-delete</v-icon
                >
                삭제
              </div>
            </v-btn>
          </h6>
          <h6 v-else>
            <v-btn
              x-small
              plain
              link
              :ripple="false"
              @click="postReport(post.id)"
            >
              <div
                class="
                  b2
                  red--text
                  text--lighten-1
                  font-weight-light
                  d-flex
                  center
                "
              >
                <v-icon small class="mr-1"> mdi-account-alert</v-icon>
                신고하기
              </div>
            </v-btn>
          </h6>
        </v-row>
        <v-row no-gutters class="mb-8">
          <dl>
            <dt class="mb-4">작성자</dt>
            <dd class="pl-8 d-flex align-center grayscale-black-5">
              <profile-info
                :size="36"
                :member="post.member"
                @report="memberReport"
              />
              {{ post.member.name }}
            </dd>
          </dl>
        </v-row>
        <v-row no-gutters class="mb-8">
          <dl>
            <dt class="mb-4">태그</dt>
            <dd class="pl-8 grayscale-black-5">
              {{ post.food.foodTags.map(f => f.name) | join }}
            </dd>
          </dl>
        </v-row>
        <v-row no-gutters>
          <v-col class="col-12">
            <dl>
              <dt class="mb-4">오늘의 문구</dt>
              <dd class="pl-8 d-flex justify-space-between grayscale-black-5">
                <div class="pr-10 text-justify">
                  {{ post.content }}
                </div>
                <div>
                  <ShareGroup />
                </div>
              </dd>
            </dl>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- section 2 -->
    <v-row>
      <v-col>
        <CardListGroup
          :cards="recentPostsOfCurrentFood.posts"
          groupName="현재 음식의 최근 올라온 글"
          :model="4"
          :first="recentPostsOfCurrentFood.first"
          :second="recentPostsOfCurrentFood.second"
          :third="recentPostsOfCurrentFood.third"
          @firstAction="doLike"
          @secondAction="doRating"
          @thirdAction="doFavorite"
          @next="moreRecentPostsOfCurrentFood"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <CardListGroup
          :cards="recentlyPosts.posts"
          groupName="최근 올라온 글"
          :model="4"
          :first="recentlyPosts.first"
          :second="recentlyPosts.second"
          :third="recentlyPosts.third"
          @firstAction="doLike"
          @secondAction="doRating"
          @thirdAction="doFavorite"
          @next="moreRecentlyPosted"
        />
        <Alert
          :dialog="infoDialog.dialog"
          :message="infoDialog.message"
          :ok-action="closeDialog"
          :close-action="closeDialog"
          @close="closeDialog"
        />
      </v-col>
    </v-row>

    <!-- section 3 -->
    <v-row class="grayscale-black-5 font-weight-light" ref="review">
      <!-- count -->
      <v-col cols="12" class="d-flex">
        <div>댓글</div>
        <div class="pl-2">{{ review.totalCount }} 개</div>
      </v-col>
      <!-- input -->
      <v-col cols="12" class="pb-0">
        <v-card
          :loading="reviewForm.isLoad"
          color="bg-secondary-black-2"
          class="rounded-t-lg pa-6 pt-10 pb-7"
          min-height="300"
        >
          <div class="d-flex mb-5" style="gap: 0 16px">
            <v-avatar size="40px">
              <v-img
                v-if="$store.state.isAuth"
                :src="$store.state.me.profileImg"
                :alt="post.imageName"
              />
              <v-img
                v-else
                :src="require('@/assets/profile.png')"
                alt="anonymous"
              />
            </v-avatar>

            <div style="width: 100%">
              <validation-provider
                rules="limit:1,3000"
                name="댓글"
                v-slot="{ errors, valid }"
                ref="reviewForPostValidation"
              >
                <v-textarea
                  v-if="$store.state.isAuth"
                  class="b1 font-weight-light pt-0 mt-0"
                  counter
                  auto-grow
                  rows="1"
                  @input="editOpen(reviewForm.edit)"
                  v-model="reviewForm.edit.text"
                  placeholder="입력하세요"
                  @keypress.enter.prevent="writeReviewForPost(reviewForm.edit)"
                  :error-messages="errors"
                ></v-textarea>
                <v-textarea
                  v-else
                  class="b1 font-weight-light pt-0 mt-0"
                  counter
                  auto-grow
                  rows="1"
                  v-model="reviewForm.edit.text"
                  @click="loginCheck"
                  placeholder="입력하세요"
                  :error-messages="errors"
                >
                </v-textarea>
                <v-expand-transition mode="enter-class">
                  <v-card
                    v-show="reviewForm.edit.visible"
                    elevation="0"
                    color="transparent"
                    class="text-right mt-4"
                  >
                    <v-btn
                      class="mr-4"
                      color="primary"
                      @click="!valid || writeReviewForPost(reviewForm.edit)"
                    >
                      댓글
                    </v-btn>
                    <v-btn @click="editClose(reviewForm.edit)" color="error">
                      취소
                    </v-btn>
                  </v-card>
                </v-expand-transition>
              </validation-provider>
            </div>
          </div>
          <div v-if="!review.reviews.length">
            <h4 align="center">댓글이 없습니다 😢</h4>
          </div>
          <!-- reviews -->
          <template v-for="(review, index) in review.reviews">
            <div
              :id="review.id"
              class="d-flex b2 mb-5"
              style="gap: 8px 0; width: 100%"
              :key="index"
            >
              <div class="d-flex" style="gap: 0 16px; width: 100%">
                <profile-info
                  :size="40"
                  :member="review.member"
                  @report="memberReport"
                />

                <div class="d-flex flex-column flex-grow-1" style="gap: 4px 0">
                  <div v-if="!review.update.visible">
                    <div class="d-flex align-baseline" style="gap: 0 12px">
                      <div class="b1">{{ review.member.name }}</div>
                      <div
                        class="b3"
                        :title="review.createdAt | yyyymmddhhmmss"
                      >
                        {{ review | to }}
                      </div>
                    </div>
                    <div class="text-break">
                      {{ review.content }}
                    </div>
                    <div class="d-flex align-center pt-1">
                      <div class="d-flex align-center mr-2">
                        <v-btn
                          width="24"
                          height="24"
                          light
                          class="bg-grayscale-black-3"
                          icon
                        >
                          <v-icon class="secondary-black-2">
                            mdi-hand-pointing-up
                          </v-icon>
                        </v-btn>
                      </div>
                      <div class="d-flex align-center mr-2">
                        <v-btn
                          width="24"
                          height="24"
                          light
                          class="bg-grayscale-black-3"
                          icon
                        >
                          <v-icon class="secondary-black-2">
                            mdi-hand-pointing-down
                          </v-icon>
                        </v-btn>
                      </div>
                      <div v-if="review.member.email !== $store.state.me.email">
                        <v-btn
                          small
                          plain
                          class="px-1"
                          @click="reviewReport(review.id)"
                        >
                          <span class="b2"> 신고 </span>
                        </v-btn>
                      </div>
                      <div v-else>
                        <v-btn
                          small
                          plain
                          class="px-1"
                          @click="openUpdateEdit(review)"
                        >
                          <span class="b2"> 수정 </span>
                        </v-btn>
                        <v-btn
                          small
                          plain
                          class="px-1"
                          @click="openDeleteAlert(review)"
                        >
                          <span class="b2">삭제</span>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <v-text-field
                      class="b1 font-weight-light pt-0 mt-0"
                      v-model="review.update.text"
                      placeholder="입력하세요123"
                      @keypress.enter.prevent="updateReview(review)"
                    />
                    <v-expand-transition mode="enter-class">
                      <v-card
                        v-show="review.update.visible"
                        elevation="0"
                        color="transparent"
                        class="text-right"
                      >
                        <v-btn
                          class="mr-4"
                          color="primary"
                          @click="updateReview(review)"
                        >
                          수정
                        </v-btn>
                        <v-btn @click="editClose(review.update)" color="error">
                          취소
                        </v-btn>
                      </v-card>
                    </v-expand-transition>
                  </div>
                  <div class="d-flex flex-column" style="gap: 12px 0">
                    <!-- reply view -->
                    <div class="d-flex">
                      <v-btn
                        v-if="review.childCount"
                        plain
                        class="px-0 rounded-xl"
                        @click="loadReviewsForReview(review)"
                      >
                        <v-icon>mdi-menu-down</v-icon>
                        <div class="b2">
                          답글 {{ review.childCount }}개 보기
                        </div>
                      </v-btn>
                      <v-btn
                        v-else
                        plain
                        class="px-0 rounded-xl"
                        @click="openChildrenOfReviewWriteInput(review)"
                      >
                        <div class="b2">답변 작성</div>
                      </v-btn>
                    </div>
                    <!-- input -->
                    <div
                      v-if="review.edit.visible"
                      class="d-flex mb-5"
                      style="gap: 0 16px"
                    >
                      <v-avatar size="32px">
                        <v-img
                          v-if="$store.state.isAuth"
                          :src="$store.state.me.profileImg"
                          :alt="post.imageName"
                        />
                        <v-img
                          v-else
                          :src="require('@/assets/profile.png')"
                          alt="anonymous"
                        />
                      </v-avatar>

                      <div class="flex-grow-1">
                        <validation-provider
                          rules="limit:1,3000"
                          name="답글"
                          v-slot="{ errors, valid }"
                        >
                          <v-textarea
                            class="b1 font-weight-light pt-0 mt-0 flex-1"
                            counter
                            auto-grow
                            rows="1"
                            @input="replyEditOpen"
                            @click="loginCheck"
                            placeholder="입력하세요"
                            v-model="review.edit.text"
                            @keypress.enter.prevent="
                              writeReviewForReview(review)
                            "
                            :error-messages="errors"
                          ></v-textarea>
                          <v-expand-transition mode="enter-class">
                            <v-card
                              v-show="review.edit.text"
                              elevation="0"
                              color="transparent"
                              class="text-right mt-4"
                            >
                              <v-btn
                                class="mr-4"
                                color="primary"
                                @click="!valid || writeReviewForReview(review)"
                              >
                                댓글
                              </v-btn>
                              <v-btn
                                @click="editClose(review.edit)"
                                color="error"
                              >
                                취소
                              </v-btn>
                            </v-card>
                          </v-expand-transition>
                        </validation-provider>
                      </div>
                    </div>
                    <!-- review > child reviews -->
                    <template v-for="(child, index) in review.child">
                      <div
                        v-if="review.edit.visible"
                        class="d-flex b2"
                        style="gap: 8px 0"
                        :key="index"
                      >
                        <div class="d-flex flex-grow-1" style="gap: 0 16px">
                          <profile-info
                            v-if="child.member.profileImg"
                            :size="32"
                            :member="child.member"
                            @report="reportModal.dialog = true"
                          />
                          <v-avatar v-else size="32px">
                            <v-img
                              :src="require('@/assets/profile.png')"
                              alt="anonymous"
                            />
                          </v-avatar>

                          <div
                            class="d-flex flex-column flex-grow-1"
                            style="gap: 4px 0"
                          >
                            <div v-if="!child.update.visible">
                              <div
                                class="d-flex align-baseline"
                                style="gap: 0 12px"
                              >
                                <div class="b1">{{ child.member.name }}</div>
                                <div class="b3">
                                  {{ child | to }}
                                </div>
                              </div>
                              <div>
                                <a :href="`#${child.parent.id}`">
                                  @{{ child.parent.member.name }}
                                </a>
                              </div>
                              <div class="text-break">
                                {{ child.content }}
                              </div>

                              <div class="d-flex align-center pt-2 pb-1">
                                <div class="d-flex align-center mr-2">
                                  <v-btn
                                    width="24"
                                    height="24"
                                    light
                                    class="bg-grayscale-black-3"
                                    icon
                                  >
                                    <v-icon class="secondary-black-2">
                                      mdi-hand-pointing-up
                                    </v-icon>
                                  </v-btn>
                                </div>
                                <div class="d-flex align-center mr-2">
                                  <v-btn
                                    width="24"
                                    height="24"
                                    light
                                    class="bg-grayscale-black-3"
                                    icon
                                  >
                                    <v-icon class="secondary-black-2">
                                      mdi-hand-pointing-down
                                    </v-icon>
                                  </v-btn>
                                </div>
                                <div
                                  v-if="
                                    child.member.email !== $store.state.me.email
                                  "
                                >
                                  <v-btn
                                    small
                                    plain
                                    class="px-1"
                                    @click="reviewReport(child.id)"
                                  >
                                    <span class="b2"> 신고 </span>
                                  </v-btn>
                                </div>
                                <div v-else>
                                  <v-btn
                                    small
                                    plain
                                    class="px-1"
                                    @click="openUpdateEdit(child)"
                                  >
                                    <span class="b2"> 수정 </span>
                                  </v-btn>
                                  <v-btn
                                    small
                                    plain
                                    class="px-1"
                                    @click="openDeleteAlert(child)"
                                  >
                                    <span class="b2"> 삭제 </span>
                                  </v-btn>
                                </div>
                              </div>
                            </div>
                            <div v-else style="width: 100%">
                              <v-text-field
                                class="b1 font-weight-light pt-0 mt-0"
                                v-model="child.update.text"
                                placeholder="입력하세요123"
                                @keypress.enter.prevent="updateReview(child)"
                              />
                              <v-expand-transition mode="enter-class">
                                <v-card
                                  v-show="child.update.visible"
                                  elevation="0"
                                  color="transparent"
                                  class="text-right"
                                >
                                  <v-btn
                                    class="mr-4"
                                    color="primary"
                                    @click="updateReview(child)"
                                  >
                                    수정
                                  </v-btn>
                                  <v-btn
                                    @click="editClose(child.update)"
                                    color="error"
                                  >
                                    취소
                                  </v-btn>
                                </v-card>
                              </v-expand-transition>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <div>
            <v-pagination
              v-if="review.totalPages > 1"
              color="primary"
              v-model="review.page"
              :length="review.totalPages"
              total-visible="10"
            >
            </v-pagination>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <WriteReportModal
      :id="reportModal.id"
      :reportType="reportModal.reportType"
      :dialog="reportModal.dialog"
      @close="reportModal.dialog = false"
      @report="report"
    />
    <Alert
      :dialog="deleteAlert.dialog"
      :message="deleteAlert.message"
      :ok-action="deleteReview"
      :close-action="closeDeleteAlert"
      :cancel-action="closeDeleteAlert"
      @close="closeDeleteAlert"
      @cancel="closeDeleteAlert"
      :ok="deleteAlert.ok"
      :no="deleteAlert.no"
    />
  </v-container>
</template>

<script>
import CardListGroup from '@/views/components/common/card/CardListGroup'
import Alert from '@/views/components/common/alert/Alert'
import postApi from '@/api/member/post'
import ShareGroup from '@/views/components/common/share/ShareList'
import ProfileInfo from '@/views/components/common/profile/ProfileInfo'
import WriteReportModal from '@/views/admin/modal/WriteReportModal'

export default {
  name: 'PostDetailPage',
  components: {
    WriteReportModal,
    ProfileInfo,
    ShareGroup,
    Alert,
    CardListGroup,
  },
  data() {
    return {
      post: {
        content: '',
        food: {
          foodTags: [],
        },
        id: 0,
        imageName: '',
        imagePath: '',
        isFavoriteByMe: false,
        isLikedByMe: false,
        member: {},
        title: '',
      },
      recommendedPosts: {
        page: 0,
        pageEnd: false,
        posts: [],
        first: {
          fill: 'mdi-heart',
          outline: 'mdi-heart-outline',
          color: 'red',
          outlineColor: 'red',
          tooltip: '좋아요',
        },
        second: {
          fill: 'mdi-star',
          outline: 'mdi-star-outline',
          color: 'orange lighten-2',
          outlineColor: 'orange lighten-2',
          tooltip: '평점',
        },
        third: {
          fill: 'mdi-check',
          outline: 'mdi-plus',
          color: '#5F5FC4',
          outlineColor: 'grey',
          tooltip: '찜',
        },
      },
      recentlyPosts: {
        page: 0,
        pageEnd: false,
        posts: [],
        first: {
          fill: 'mdi-heart',
          outline: 'mdi-heart-outline',
          color: 'red',
          outlineColor: 'red',
          tooltip: '좋아요',
        },
        second: {
          fill: 'mdi-star',
          outline: 'mdi-star-outline',
          color: 'orange lighten-2',
          outlineColor: 'orange lighten-2',
          tooltip: '평점',
        },
        third: {
          fill: 'mdi-check',
          outline: 'mdi-plus',
          color: '#5F5FC4',
          outlineColor: 'grey',
          tooltip: '찜',
        },
      },
      recentPostsOfCurrentFood: {
        page: 0,
        pageEnd: false,
        posts: [],
        first: {
          fill: 'mdi-heart',
          outline: 'mdi-heart-outline',
          color: 'red',
          outlineColor: 'red',
          tooltip: '좋아요',
        },
        second: {
          fill: 'mdi-star',
          outline: 'mdi-star-outline',
          color: 'orange lighten-2',
          outlineColor: 'orange lighten-2',
          tooltip: '평점',
        },
        third: {
          fill: 'mdi-check',
          outline: 'mdi-plus',
          color: '#5F5FC4',
          outlineColor: 'grey',
          tooltip: '찜',
        },
      },
      infoDialog: {
        dialog: false,
        card: {},
        message: '로그인 후 이용가능한 서비스입니다.',
      },
      imgDialog: false,
      reviewForm: {
        edit: {
          visible: false,
          text: '',
        },
        replyEdit: false,
        isLoad: false,
      },
      review: {
        totalCount: 0,
        page: 1,
        totalPages: 1,
        reviews: [],
      },
      reportModal: {
        reportType: '',
        dialog: false,
        id: null,
      },
      deleteAlert: {
        dialog: false,
        message: '댓글을 정말 삭제 하시겠습니까?',
        ok: '삭제',
        no: '취소',
        review: {},
      },
    }
  },
  methods: {
    /** postId에 해당하는 Post 불러오기 */
    loadPost() {
      this.$store
        .dispatch('GET_POST', this.$route.params.postId)
        .then(post => {
          const newPost = {
            ...post,
            first: post.isLikedByMe,
            second: false,
            third: post.isFavoriteByMe,
          }
          console.log('newPost -> ', newPost)
          this.post = newPost

          this.loadRecentPostsOfCurrentFood(post.food.id)
        })
        .catch(error => {
          // this.$router.push('/404')
          console.log(error.response)
          console.log(error.response.data.messageKr)
          this.$toastError('게시글을 불러올 수 없습니다')
        })
    },
    /** 최근 Post 불러오기 */
    loadRecentlyPosts() {
      const { page } = this.recentlyPosts
      console.log(page)

      this.$store
        .dispatch('GET_RECENTLY_POSTS', page)
        .then(postsPage => {
          const { content: posts } = postsPage
          console.log('post', posts)

          if (posts.length === 0) {
            return (this.recentlyPosts.pageEnd = true)
          }

          const newPosts = posts.map(post => ({
            ...post,
            first: post.isLikedByMe,
            firstCount: post.numberOfLikes,
            second: false,
            secondCount: 0,
            third: post.isFavoriteByMe,
            thirdCount: post.numberOfFavorites,
            src: post.imagePath,
            alt: post.imageName,
            likeAction: true,
            favoriteAction: true,
            deleteAction: true,
          }))

          this.recentlyPosts.posts.push(...newPosts)
          // this.recentlyPosts.posts = [].concat(newPosts)
        })
        .catch(error => {
          this.$toastError('최근 게시글을 불러 올 수 없습니다')
          console.log(error)
        })
    },
    /** 최근 Post 불러오기 (음식아이디 필요) */
    loadRecentPostsOfCurrentFood() {
      const { id: foodId } = this.post.food
      const { page } = this.recentPostsOfCurrentFood
      this.$store
        .dispatch('GET_RECENT_POSTS_OF_CURRENT_FOOD', { foodId, page })
        .then(postsPage => {
          const { content: posts } = postsPage
          // console.log(posts)

          if (posts.length === 0) {
            return (this.recentPostsOfCurrentFood.pageEnd = true)
          }

          const newPosts = posts.map(post => ({
            ...post,
            first: post.isLikedByMe,
            firstCount: post.numberOfLikes,
            second: false,
            secondCount: 0,
            third: post.isFavoriteByMe,
            thirdCount: post.numberOfFavorites,
            src: post.imagePath,
            alt: post.imageName,
            likeAction: true,
            favoriteAction: true,
            deleteAction: true,
          }))

          this.recentPostsOfCurrentFood.posts.push(...newPosts)
          // this.recentPostsOfCurrentFood.posts = [].concat(newPosts)
        })
        .catch(error => {
          this.$toastError('음식에 해당하는 최근 게시글을 불러올 수 없습니다')
          console.log(error)
        })
    },
    async doLike(card) {
      const { token } = this.$store.state

      if (!token) {
        return (this.infoDialog.dialog = true)
      }

      try {
        if (card.first) {
          await postApi.cancelLiked(card.id)
          this.likedUpdateCancelView(card.id)
        } else {
          await postApi.likePost(card.id)
          this.likedUpdateAddView(card.id)
        }

        // this.init()
      } catch (error) {
        this.$toastError('좋아요를 할 수 없습니다')
      }
    },
    doRating() {
      this.infoDialog.message = '아직 구현되지 않은 기능입니다'
      this.infoDialog.dialog = true
    },
    async doFavorite(card) {
      const { token } = this.$store.state

      if (!token) {
        return (this.infoDialog.dialog = true)
      }
      try {
        if (card.third) await postApi.unfavoritePost(card.id)
        else await postApi.favoritePost(card.id)

        this.init()
      } catch (error) {
        this.$toastError('찜을 할 수 없습니다')
      }
    },
    /** 현재 음식의 최근올라온 글 10건 더 조회 */
    moreRecentPostsOfCurrentFood() {
      if (this.recentPostsOfCurrentFood.pageEnd) return
      this.recentPostsOfCurrentFood.page++
      this.loadRecentPostsOfCurrentFood()
    },
    /** 최근올라온 글 10건 더 조회 */
    moreRecentlyPosted() {
      if (this.recentlyPosts.pageEnd) return
      this.recentlyPosts.page++
      this.loadRecentlyPosts()
    },
    closeDialog() {
      this.infoDialog.dialog = false
    },
    init() {
      this.recentlyPosts.posts = []
      this.recentlyPosts.page = 0
      this.recentlyPosts.pageEnd = false

      this.recentPostsOfCurrentFood.posts = []
      this.recentPostsOfCurrentFood.page = 0
      this.recentPostsOfCurrentFood.pageEnd = false

      this.loadPost()
      this.loadRecentlyPosts()
      this.loadReviewsForPost()
    },
    editOpen(input) {
      if (input.text) input.visible = true
      else input.visible = false
    },
    editClose(input) {
      input.visible = false
      input.text = ''
    },
    replyEditOpen(val) {
      if (val) this.reviewForm.replyEdit = true
      else this.reviewForm.replyEdit = false
    },
    /** 글에 대한 댓글 작성 */
    writeReviewForPost(review) {
      console.log('wrp-> ', review)
      if (!this.$store.state.isAuth) return (this.infoDialog.dialog = true)

      // 아무것도 입력안 한 경우
      if (!review.text) return

      const data = {
        postId: this.$route.params.postId,
        content: this.reviewForm.edit.text,
      }

      this.$store
        .dispatch('WRITE_REVIEW_FOR_POST', data)
        .then(data => {
          console.log('write response', data)
          this.loadReviewsForPost()
          this.$toastSuccess('작성되었습니다')
          this.reviewForm.edit.text = ''
          this.reviewForm.edit.visible = false
        })
        // 리뷰작성이 안될 때 해당 필드에 error message 출력하기
        .catch(error => {
          this.$toastError('댓글을 작성할 수 없습니다')
          console.log(error)
        })
    },
    /** post 에 대한 리뷰 가져오기 */
    loadReviewsForPost() {
      const { postId } = this.$route.params
      let { page } = this.review
      page--

      this.$store
        .dispatch('GET_REVIEWS_FOR_POST', { postId, page })
        .then(reviewPageAndTotalCount => {
          console.log('reviewPage!!->', reviewPageAndTotalCount)

          const { totalCount } = reviewPageAndTotalCount
          const { content: reviews, totalPages } =
            reviewPageAndTotalCount.reviewPage

          this.review.totalCount = totalCount
          const newReviews = reviews.map(review => ({
            ...review,
            edit: { visible: false, text: '' },
            update: { visible: false, text: '' },
          }))

          this.review.reviews = [].concat(newReviews)
          this.review.totalPages = totalPages
        })
        .catch(error => {
          this.$toastError('댓글을 가져올 수 없습니다')
          console.log(error)
        })
    },
    // todo : 새로고침 해야만 리뷰의 답글 개수가 올라감
    loadReviewsForReview(review) {
      this.openChildrenOfReviewWriteInput(review)

      const data = {
        postId: this.$route.params.postId,
        reviewId: review.id,
      }

      return this.$store
        .dispatch('GET_REVIEWS_FOR_REVIEW', data)
        .then(childReviews => {
          const beforeLoadChildCount = review.childCount

          const newChildReviews = childReviews.map(review => ({
            ...review,
            update: {
              text: '',
              visible: false,
            },
          }))

          review.child = [].concat(newChildReviews)

          // 카운터 업데이트
          review.childCount = review.child.length
          this.review.totalCount += review.childCount - beforeLoadChildCount
        })
        .catch(error => this.$toastError(error))
    },
    /** 로그인하지 않은 경우 답변을 달 수 없다 */
    loginCheck(event) {
      if (!this.$store.state.isAuth) {
        this.infoDialog.dialog = true
        if (event) {
          event.target.blur()
        }
        return false
      }
      return true
    },
    /** 댓글에 대한 답글 작성 */
    writeReviewForReview(review) {
      const { postId } = this.$route.params
      const data = {
        postId,
        reviewId: review.id,
        content: review.edit.text,
      }
      review.edit.text = ''
      this.$store
        .dispatch('WRITE_REVIEW_FOR_REVIEW', data)
        .then(async data => {
          console.log('review reply -> ', data)
          await this.loadReviewsForReview(review)
          this.openChildrenOfReviewWriteInput(review)
          this.countUpdate(review)
          this.$toastSuccess('작성되었습니다')
        })
        .catch(error => {
          this.$toastError('답글을 작성할 수 없습니다')
          console.log(error)
        })
    },
    /** 답글 작성 폼 열기 닫기 */
    openChildrenOfReviewWriteInput(review) {
      console.log('실행함', review)
      review.edit.visible = !review.edit.visible
    },
    /** 리뷰 수정하기 */
    updateReview(review) {
      const { id: reviewId } = review
      const { text: content } = review.update

      this.$store
        .dispatch('UPDATE_REVIEW', {
          reviewId,
          content,
        })
        .then(() => {
          this.$toastSuccess('수정되었습니다')
          review.content = content
          review.update.text = ''
          review.update.visible = false
          review.updatedAt = new Date()
        })
        .catch(error => {
          this.$toastError('수정을 할 수 없습니다')
          console.log(error)
        })
    },
    countUpdate(parent) {
      console.log('p', parent)
    },
    /** 좋아요 업데이트 취소 보기 */
    likedUpdateCancelView(postId) {
      console.log('pppId->', postId)
      /** Post */
      if (this.$route.params.postId == postId) {
        this.subLike(this.post)
      }
      /** Post Arr 1 */
      this.recentPostsOfCurrentFood.posts
        .filter(post => post.id === postId)
        .forEach(post => this.subLike(post))
      /** Post Arr 2*/
      this.recentlyPosts.posts
        .filter(post => post.id === postId)
        .forEach(post => this.subLike(post))
    },
    /** 좋아요 빼기 */
    subLike(post) {
      post.isLikedByMe = false
      post.first = false
      post.firstCount -= 1
      post.numberOfLikes -= 1
    },
    /** 좋아요 업데이트 추가 보기 */
    likedUpdateAddView(postId) {
      /** Post */
      if (this.$route.params.postId == postId) {
        this.addLike(this.post)
      }
      /** Post Arr 1 */
      this.recentPostsOfCurrentFood.posts
        .filter(post => post.id === postId)
        .forEach(post => this.addLike(post))
      /** Post Arr 2*/
      this.recentlyPosts.posts
        .filter(post => post.id === postId)
        .forEach(post => this.addLike(post))
    },
    /** 좋아요 추가 */
    addLike(post) {
      post.isLikedByMe = true
      post.first = true
      post.firstCount += 1
      post.numberOfLikes += 1
    },
    /** review 수정 폼 보이게 하기 */
    openUpdateEdit(review) {
      console.log(review)
      review.update.visible = true
      review.update.text = review.content
    },
    /** post 삭제 하기 */
    deletePost(post) {
      console.log(post)
    },
    /** review 삭제 하기 */
    deleteReview() {
      this.deleteAlert.dialog = false

      const { review } = this.deleteAlert

      const { id: reviewId } = review

      this.$store
        .dispatch('DELETE_REVIEW', reviewId)
        .then(() => {
          this.$toastSuccess('댓글을 삭제하였습니다')
          this.deleteReviewView(review)
        })
        .catch(error => {
          this.$toastError('댓글을 삭제할 수 없습니다')
          console.log(error)
        })
    },
    /** 삭제 alert 창 띄우기 */
    openDeleteAlert(review) {
      console.log('여기 찎어보자', review)
      this.deleteAlert.review = review
      this.deleteAlert.dialog = true
    },
    /** 삭제 alert 창 닫기 */
    closeDeleteAlert() {
      this.deleteAlert.dialog = false
    },
    /** review 삭제 된 경우 view update 하기 */
    deleteReviewView(review) {
      // 댓글 인 경우
      if (!review.parent) {
        const findIndex = this.review.reviews.findIndex(r => r.id === review.id)
        this.review.reviews.splice(findIndex, 1)
        this.review.totalCount--
        // 답글 인 경우
      } else {
        this.review.reviews.forEach(p => {
          if (p.id === review.parent.id) {
            const findIndex = p.child.findIndex(pc => pc.id === review.id)
            p.child.splice(findIndex, 1)
            --p.childCount
            this.review.totalCount--
            p.return
          }
        })
      }
    },
    /** 신고하기 */
    report(data) {
      this.$store
        .dispatch('DO_REPORT', data)
        .then(() => {
          this.$toastSuccess('신고되었습니다')
        })
        .catch(error => {
          this.$toastError('신고를 할 수 없습니다')
          console.log(error)
        })

      this.reportModal.dialog = false
      this.reportModal.id = null
      this.reportModal.reportType = ''
    },
    postReport(postId) {
      if (!this.loginCheck()) return

      console.log('postId -> ', postId)
      this.reportModal.id = postId
      this.reportModal.reportType = 'POST'
      this.reportModal.dialog = true
    },
    memberReport(memberId) {
      console.log('memberId ->', memberId)
      this.reportModal.id = memberId
      this.reportModal.reportType = 'PROFILE'
      this.reportModal.dialog = true
    },
    reviewReport(reviewId) {
      this.reportModal.id = reviewId
      this.reportModal.reportType = 'REVIEW'
      this.reportModal.dialog = true
    },
  },
  created() {
    this.review.page = Number(this.$route.query.page) || 1
  },
  mounted() {
    this.init()
  },
  watch: {
    '$route.params.postId': function () {
      window.scrollTo({ top: 0, behavior: 'smooth' })

      this.init()
    },
    'review.page': function () {
      this.loadReviewsForPost()
    },
  },
}
</script>

<style scoped lang="scss">
#current-post-img {
  background-color: #d1d1d1;
}

.tooltip {
  gap: 4px 0;
}

@media screen and (max-width: 954px) {
  #current-post-img {
  }
}
</style>
