<template>
  <v-container fluid class="pb-0">
    <v-row class="px-lg-16 mb-5 mb-md-0">
      <!-- left -->
      <v-col cols="12" md="5" class="pr-6">
        <v-card class="transparent" flat>
          <v-dialog fullscreen v-model="imgDialog">
            <template v-slot:activator="{ attrs, on }">
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
            <div
              class="d-flex align-center justify-center fill-height"
              @click="imgDialog = false"
              style="background-color: rgba(0, 0, 0, 0.85)"
            >
              <v-img
                contain
                :aspect-ratio="16 / 7"
                class="pointer"
                :src="post.imagePath"
                :alt="post.imageName"
              />
            </div>
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
                    <v-icon v-else color="orange lighten-2"
                      >mdi-star-outline</v-icon
                    >
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
          <h6>
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
    <v-row>
      <v-col cols="12" class="bg-grayscale-black-2 rounded-t-lg pa-6 pb-10">
        <div class="d-flex" style="gap: 0 16px">
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
              placeholder="입력하세요"
            />
            <v-expand-transition mode="enter-class">
              <v-card
                v-show="reviewForm.edit"
                height="100"
                width="100"
                class="mx-auto secondary"
              >
                <v-btn color="priamary">수정</v-btn>
              </v-card>
            </v-expand-transition>
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
        edit: false,
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
    editOpen(val) {
      if (val) this.reviewForm.edit = true
      else this.reviewForm.edit = false
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
