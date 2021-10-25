<template>
  <div class="">
    <div class="mb-4 mt-4">
      <Profile
        :top="profile.myPostStatus"
        :middle="profile.favoriteStatus"
        :bottom="profile.likeStatus"
        :top-action="undefined"
        :middle-action="undefined"
        :bottom-action="undefined"
        :profile-action="undefined"
      ></Profile>
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
import postApi from '@/api/member/post'
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
      profile: {
        myPostStatus: '작성한 게시글 수 : 10개',
        likeStatus: '좋아요 한 글 : 10개',
        favoriteStatus: '내가 찜한 게시글 : 10개',
      },
    }
  },
  methods: {
    async doLike(card) {
      if (card.like) {
        await postApi.cancelLiked(card.id).then(({ status }) => {
          if (status == 200) {
            card.like = false
            this.postLikedByMe.posts = []
            this.loadLikePost()
            this.makeOtherLike(card.id, false)
          }
        })
      } else {
        await postApi.likePost(card.id).then(({ status }) => {
          if (status == 200) {
            card.like = true
            this.postLikedByMe.posts = []
            this.loadLikePost()
            this.makeOtherLike(card.id, true)
          }
        })
      }
      await this.statusLikePost()
    },
    async doFavorite(card) {
      if (card.favorite) {
        await postApi.unfavoritePost(card.id).then(({ status }) => {
          if (status == 200) {
            card.favorite = false
            this.makeOtherFavorite(card.id, false)
            this.postFavoriteByMe.posts = []
            this.loadFavoritePost()
          }
        })
      } else {
        await postApi.favoritePost(card.id).then(({ status }) => {
          if (status == 200) {
            card.favorite = true
            this.makeOtherFavorite(card.id, true)
            this.postFavoriteByMe.posts = []
            this.loadFavoritePost()
          }
        })
      }
      await this.statusFavoritePost()
    },
    checkDelete(card) {
      this.deleteDialog.dialog = true
      this.deleteDialog.card = card
    },
    doDeleteAtDialog() {
      if (this.$isNotEmpty(this.deleteDialog.card)) {
        postApi.deletePost(this.deleteDialog.card.id).then(() => {
          this.myPost.posts = []
          this.loadMyPost()
          this.closeDialog()
        })
      }
      location.reload()
    },
    loadMyPost() {
      let myPost = postApi.getMyPost()
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
      let postLikedByMe = postApi.getPostLikedByMe()
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
      let postFavoriteByMe = postApi.getPostFavoriteByMe()
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

    makeOtherLike(id, flag) {
      this.postFavoriteByMe.posts.forEach(c => {
        if (c.id == id) {
          c.like = flag
        }
      })
      this.postLikedByMe.posts.forEach(c => {
        if (c.id == id) {
          c.like = flag
        }
      })
      this.myPost.posts.forEach(c => {
        if (c.id == id) {
          c.like = flag
        }
      })
    },

    makeOtherFavorite(id, flag) {
      this.postFavoriteByMe.posts.forEach(c => {
        if (c.id == id) {
          c.favorite = flag
        }
      })
      this.postLikedByMe.posts.forEach(c => {
        if (c.id == id) {
          c.favorite = flag
        }
      })
      this.myPost.posts.forEach(c => {
        if (c.id == id) {
          c.favorite = flag
        }
      })
    },

    statusMyPost() {
      postApi.countMyPost().then(({ data }) => {
        this.profile.myPostStatus = `작성한 게시글 수 : ${data}개`
      })
    },
    statusLikePost() {
      postApi.countLikePost().then(({ data }) => {
        this.profile.likeStatus = `좋아요 한 글 : ${data}개`
      })
    },
    statusFavoritePost() {
      postApi.countFavoritePost().then(({ data }) => {
        this.profile.favoriteStatus = `내가 찜한 게시글 : ${data}개`
      })
    },
  },
  mounted() {
    this.loadMyPost()
    this.loadFavoritePost()
    this.loadLikePost()
    this.statusMyPost()
    this.statusLikePost()
    this.statusFavoritePost()
  },
}
</script>

<style scoped></style>
