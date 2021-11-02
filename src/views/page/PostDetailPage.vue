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
                  <div>{{ post.numberOfLikes | oneThousand }}</div>
                </div>
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
            :title="post.createdAt | yyyymmdd"
          >
            {{ post.createdAt | untillNow }} 일 전
          </h6>
          <v-spacer />
          <h6 v-if="!$store.state.me">
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
                <v-icon small class="mr-1"> mdi-account-alert</v-icon>
                신고하기
              </div>
            </v-btn>
          </h6>
          <h6 v-else>
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
                <v-icon small class="mr-1"> mdi-delete</v-icon>
                삭제
              </div>
            </v-btn>
          </h6>
        </v-row>
        <v-row no-gutters class="mb-8">
          <dl>
            <dt class="mb-4">작성자</dt>
            <dd class="pl-8 d-flex align-center grayscale-black-5">
              <v-img
                v-ripple
                dark
                :src="post.member.profileImg"
                max-width="36"
                class="pointer rounded-circle mr-2"
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
    <v-row class="grayscale-black-5 font-weight-light">
      <!-- count -->
      <v-col cols="12" class="d-flex">
        <div>댓글</div>
        <div class="pl-2">0개</div>
      </v-col>
      <!-- input -->
      <v-col
        cols="12"
        class="bg-secondary-black-2 rounded-t-lg pa-6 pt-10 pb-10"
      >
        <div class="d-flex mb-5" style="gap: 0 16px">
          <v-avatar size="40px">
            <v-img
              v-if="$store.state.me"
              :src="$store.state.me.profileImg"
              :alt="post.imageName"
            />
            <v-img v-else :src="post.imagePath" :alt="post.imageName" />
          </v-avatar>

          <div style="width: 100%">
            <v-text-field
              class="b1 font-weight-light pt-0 mt-0"
              @input="editOpen"
              v-model="reviewForm.edit.text"
              placeholder="입력하세요"
            />
            <v-expand-transition mode="enter-class">
              <v-card
                v-show="reviewForm.edit.visible"
                elevation="0"
                color="transparent"
                class="text-right"
              >
                <v-btn class="mr-4" color="primary" @click="writeReviewForPost"
                  >댓글</v-btn
                >
                <v-btn @click="editClose" color="error">취소</v-btn>
              </v-card>
            </v-expand-transition>
          </div>
        </div>
        <!-- reviews -->
        <div class="d-flex b2" style="gap: 8px 0">
          <div class="d-flex" style="gap: 0 16px">
            <v-avatar size="40px">
              <v-img
                v-if="$store.state.me"
                :src="$store.state.me.profileImg"
                :alt="post.imageName"
              />
              <v-img v-else :src="post.imagePath" :alt="post.imageName" />
            </v-avatar>

            <div class="d-flex flex-column" style="gap: 4px 0">
              <div class="d-flex align-baseline" style="gap: 0 12px">
                <div class="b1">{{ $store.state.me.name }}</div>
                <div class="b3">47분 전 (수정됨)</div>
              </div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
                aspernatur autem culpa cupiditate, debitis delectus dignissimos
                dolores excepturi incidunt ipsa magni molestias nobis nostrum
                possimus provident quasi quidem, soluta sunt.
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
                <v-btn small plain class="px-1">답글</v-btn>
                <v-btn small plain class="px-1">수정</v-btn>
                <v-btn small plain class="px-1">삭제</v-btn>
              </div>
              <div class="d-flex flex-column" style="gap: 12px 0">
                <!-- reply view -->
                <div class="d-flex">
                  <v-btn plain class="px-0 rounded-xl">
                    <v-icon>mdi-menu-down</v-icon>
                    <div class="b2">답글 4개 보기</div>
                  </v-btn>
                </div>
                <!-- review > reviews 1 -->
                <div class="d-flex b2" style="gap: 8px 0">
                  <div class="d-flex" style="gap: 0 16px">
                    <v-avatar size="32px">
                      <v-img
                        v-if="$store.state.me"
                        :src="$store.state.me.profileImg"
                        :alt="post.imageName"
                      />
                      <v-img
                        v-else
                        :src="require('@/assets/profile.png')"
                        :alt="post.imageName"
                      />
                    </v-avatar>

                    <div class="d-flex flex-column" style="gap: 4px 0">
                      <div class="d-flex align-baseline" style="gap: 0 12px">
                        <div class="b1">{{ $store.state.me.name }}</div>
                        <div class="b3">47분 전 (수정됨)</div>
                      </div>
                      <div>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Ab aspernatur autem culpa cupiditate, debitis
                        delectus dignissimos dolores excepturi incidunt ipsa
                        magni molestias nobis nostrum possimus provident quasi
                        quidem, soluta sunt.
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
                        <v-btn small plain class="px-1">답글</v-btn>
                        <v-btn small plain class="px-1">수정</v-btn>
                        <v-btn small plain class="px-1">삭제</v-btn>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- review > reviews 2 -->
                <div class="d-flex b2" style="gap: 8px 0">
                  <div class="d-flex" style="gap: 0 16px">
                    <v-avatar size="32px">
                      <v-img
                        v-if="$store.state.me"
                        :src="$store.state.me.profileImg"
                        :alt="post.imageName"
                      />
                      <v-img
                        v-else
                        :src="post.imagePath"
                        :alt="post.imageName"
                      />
                    </v-avatar>

                    <div class="d-flex flex-column" style="gap: 4px 0">
                      <div class="d-flex align-baseline" style="gap: 0 12px">
                        <div class="b1">{{ $store.state.me.name }}</div>
                        <div class="b3">47분 전 (수정됨)</div>
                      </div>
                      <div>
                        <!-- 답변 대상 -->
                        <a href="#" class="text-decoration-none">
                          @{{ $store.state.me.name }}
                        </a>
                      </div>
                      <div>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Ab aspernatur autem culpa cupiditate, debitis
                        delectus dignissimos dolores excepturi incidunt ipsa
                        magni molestias nobis nostrum possimus provident quasi
                        quidem, soluta sunt.
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
                        <v-btn small plain class="px-1">답글</v-btn>
                        <v-btn small plain class="px-1">수정</v-btn>
                        <v-btn small plain class="px-1">삭제</v-btn>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- input -->
                <div class="d-flex mb-5" style="gap: 0 16px">
                  <v-avatar size="32px">
                    <v-img
                      v-if="$store.state.me"
                      :src="$store.state.me.profileImg"
                      :alt="post.imageName"
                    />
                    <v-img v-else :src="post.imagePath" :alt="post.imageName" />
                  </v-avatar>

                  <div style="width: 100%">
                    <v-text-field
                      class="b1 font-weight-light pt-0 mt-0"
                      @input="replyEditOpen"
                      placeholder="입력하세요"
                    />
                    <v-expand-transition mode="enter-class">
                      <v-card
                        v-show="reviewForm.replyEdit"
                        elevation="0"
                        color="transparent"
                        class="text-right"
                      >
                        <v-btn class="mr-4" color="primary">댓글</v-btn>
                        <v-btn color="error">취소</v-btn>
                      </v-card>
                    </v-expand-transition>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CardListGroup from '@/views/components/common/card/CardListGroup'
import Alert from '@/views/components/common/alert/Alert'
import postApi from '@/api/member/post'
import ShareGroup from '@/views/components/common/share/ShareList'

export default {
  name: 'PostDetailPage',
  components: { ShareGroup, Alert, CardListGroup },
  data() {
    return {
      post: {
        content: '',
        createdAt: [0, 1, 1, 0, 0, 0, 0],
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
        data: {
          reviewForPost: '',
        },
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
        .catch(error => this.$toastError(error))
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

          // this.recentlyPosts.posts.push(...newPosts)
          this.recentlyPosts.posts = [].concat(newPosts)
        })
        .catch(error => this.$toastError(error))
    },
    /** 최근 Post 불러오기 (음식아이디 필요) */
    loadRecentPostsOfCurrentFood(foodId) {
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

          // this.recentPostsOfCurrentFood.posts.push(...newPosts)
          this.recentPostsOfCurrentFood.posts = [].concat(newPosts)
        })
        .catch(error => this.$toastError(error))
    },
    async doLike(card) {
      const { token } = this.$store.state

      if (!token) {
        return (this.infoDialog.dialog = true)
      }

      try {
        if (card.first) await postApi.cancelLiked(card.id)
        else await postApi.likePost(card.id)
        this.init()
      } catch (error) {
        this.$toastError(error)
      }
    },
    doRating() {},
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
        this.$toastError(error)
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
      this.loadPost()
      this.loadRecentlyPosts()
    },
    editOpen() {
      if (this.reviewForm.edit.text) this.reviewForm.edit.visible = true
      else this.reviewForm.edit.visible = false
    },
    editClose() {
      this.reviewForm.edit.visible = false
      this.reviewForm.edit.text = ''
    },
    replyEditOpen(val) {
      if (val) this.reviewForm.replyEdit = true
      else this.reviewForm.replyEdit = false
    },
    /** 글에 대한 댓글 작성 */
    writeReviewForPost() {
      const data = {
        postId: this.$route.params.postId,
        content: this.reviewForm.edit.text,
      }

      this.$store
        .dispatch('WRITE_REVIEW_FOR_POST', data)
        .then(data => {
          console.log('write response', data)
          this.editClose()
        })
        // 리뷰작성이 안될 때 해당 필드에 error message 출력하기
        .catch(error => this.$toastError(error))
    },
  },
  mounted() {
    this.init()
  },
  watch: {
    '$route.params.postId': function () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      this.init()
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
