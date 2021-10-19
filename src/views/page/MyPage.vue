<template>
  <div class="">
    <div class="mb-4 mt-4">
      <Profile></Profile>
    </div>
    <div class="mt-4">
      <div>
        <CardListGroup
          :cards="myPost.posts"
          groupName="내가 작성한 글"
          :model="4"
          @first="doLike"
          @second="doFavorite"
          @third="checkDelete"
        />
      </div>
      <div>
        <CardListGroup
          :cards="postFavoriteByMe.posts"
          groupName="찜한 글"
          :model="4"
          @first="doLike"
          @second="doFavorite"
          @third="checkDelete"
        />
      </div>
      <div>
        <CardListGroup
          :cards="postLikedByMe.posts"
          groupName="좋아요를 누른 글"
          :model="4"
          @first="doLike"
          @second="doFavorite"
          @third="checkDelete"
        />
        <Alert
          :dialog="deleteDialog.dialog"
          :ok-action="doDeleteAtDialog"
          :close-action="closeDialog"
          :cancel-action="closeDialog"
          :message="deleteDialog.message"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Profile from '@/views/components/common/profile/Profile'
import CardListGroup from '@/views/components/common/card/CardListGroup'
import {
  likePost,
  cancelLikd,
  favoritePost,
  unfavoritePost,
  deletePost,
} from '@/api/admin/post'
import {
  getPostLikedByMe,
  getPostFavoriteByMe,
  getMyPost,
} from '@/api/member/post'
import Alert from '@/views/components/common/alert/Alert'

export default {
  name: 'mypage',
  components: {
    Profile,
    CardListGroup,
    Alert,
  },
  data() {
    return {
      postLikedByMe: {
        page: 1,
        size: 10,
        posts: [],
      },
      postFavoriteByMe: {
        page: 1,
        size: 10,
        posts: [],
      },
      myPost: {
        page: 1,
        size: 10,
        posts: [],
      },
      deleteDialog: {
        dialog: false,
        card: {},
        message: '정말로 삭제하시겠습니까?',
      },
    }
  },
  methods: {
    doLike(card) {
      if (card.like) {
        cancelLikd(card.id).then(({ status }) => {
          if (status == 200) {
            card.like = false
            this.postLikedByMe.posts = []
            this.loadLikePost()
          }
        })
      } else {
        likePost(card.id).then(({ status }) => {
          if (status == 200) {
            card.like = true
            this.postLikedByMe.posts = []
            this.loadLikePost()
          }
        })
      }
    },
    doFavorite(card) {
      if (card.favorite) {
        unfavoritePost(card.id).then(({ status }) => {
          if (status == 200) {
            card.favorite = false
            this.postFavoriteByMe.posts = []
            this.loadFavoritePost()
          }
        })
      } else {
        favoritePost(card.id).then(({ status }) => {
          if (status == 200) {
            card.favorite = true
            this.postFavoriteByMe.posts = []
            this.loadFavoritePost()
          }
        })
      }
    },
    checkDelete(card) {
      this.deleteDialog.dialog = true
      this.deleteDialog.card = card
    },
    doDeleteAtDialog() {
      if (this.$isNotEmpty(this.deleteDialog.card)) {
        deletePost(this.deleteDialog.card.id).then(() => {
          this.myPost.posts = []
          this.loadMyPost()
          this.closeDialog()
        })
      }
    },
    loadMyPost() {
      let myPost = getMyPost()
      myPost.then(({ data: { content } }) => {
        for (let d of content) {
          this.myPost.posts.push({
            id: d.id,
            title: d.title,
            content: d.content,
            src: d.imagePath,
            alt: d.imageName,
            like: d.isLikedByMe,
            favorite: d.isFavoriteByMe,
            deleteAction: true,
            likeAction: true,
            favoriteAction: true,
          })
        }
      })
    },
    loadLikePost() {
      let postLikedByMe = getPostLikedByMe()
      postLikedByMe.then(({ data: { content } }) => {
        // this.postLikedByMe.posts = []
        for (let d of content) {
          this.postLikedByMe.posts.push({
            id: d.id,
            title: d.title,
            content: d.content,
            src: d.imagePath,
            alt: d.imageName,
            like: d.isLikedByMe,
            favorite: d.isFavoriteByMe,
            deleteAction: false,
            likeAction: true,
            favoriteAction: true,
          })
        }
      })
    },
    loadFavoritePost() {
      let postFavoriteByMe = getPostFavoriteByMe()
      postFavoriteByMe.then(({ data: { content } }) => {
        for (let d of content) {
          this.postFavoriteByMe.posts.push({
            id: d.id,
            title: d.title,
            content: d.content,
            src: d.imagePath,
            alt: d.imageName,
            like: d.isLikedByMe,
            favorite: d.isFavoriteByMe,
            deleteAction: false,
            likeAction: true,
            favoriteAction: true,
          })
        }
      })
    },

    closeDialog() {
      this.deleteDialog.dialog = false
    },
  },
  mounted() {
    this.loadMyPost()
    this.loadFavoritePost()
    this.loadLikePost()
  },
}
</script>

<style scoped></style>
