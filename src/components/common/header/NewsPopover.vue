<template>
  <v-card dark elevation="16" max-width="400" class="darken-1">
    <v-virtual-scroll
      :bench="benched"
      :items="items"
      height="326"
      item-height="64"
    >
      <template v-slot:default="{ item }">
        <v-list-item :key="item" to="/" class="px-2">
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="d-flex">
              <div>{{ item.title }}</div>
              <div class="board c1">{{ item.board }}</div>
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ item.subtitle }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-list-item-action-text>
              {{ item.time }}
            </v-list-item-action-text>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-virtual-scroll>
  </v-card>
</template>

<script>
export default {
  name: 'NewsPopover',
  data: () => ({
    benched: 0,
  }),
  computed: {
    items() {
      return [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Nibh felis',
          subtitle: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquid animi culpa cum delectus eveniet exercitationem facilis fuga inventore itaque molestiae nam nisi nobis odio odit provident, quam quasi quis quo ratione, repellendus repudiandae sit sunt tenetur voluptatibus. Aspernatur aut ducimus fuga labore magnam magni maiores modi molestiae molestias natus necessitatibus, neque quam quidem quos repellendus soluta voluptatibus. Alias, animi error in, minus neque odio officia qui quo quos totam, ut veritatis voluptates. Accusamus modi quasi quo quos recusandae? Aspernatur autem, blanditiis eius laboriosam modi nam nihil non reiciendis rerum velit. Commodi cupiditate deserunt error necessitatibus, neque quisquam ullam. Debitis.`,
          board: '밥묵자',
          time: '15분 전',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Nibh felis',
          subtitle: `asdasddasd.`,
          board: '떡볶이 먹자',
          time: '15분 전',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle: 'asdasdasdasda',
          board: '오늘은 치킨이닭',
          time: '15분 전',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
          subtitle: 'asdasdasd',
          board: '오늘은 햄버거닭',
          time: '15분 전',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          subtitle: 'asdasd',
          board: '밥묵자',
          time: '15분 전',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Recipe to try',
          subtitle: 'asdasd',
          board: '밥묵자',
          time: '15분 전',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Recipe to try',
          subtitle: 'asdaㄷsd',
          board: '밥묵자',
          time: '15분 전',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Recipe to try',
          subtitle: 'asdasd',
          board: '밥묵자',
          time: '15분 전',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          subtitle: 'asdasd',
          board: '밥묵자',
          time: '15분 전',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Recipe to try',
          subtitle: 'asdasd',
          board: '밥묵자',
          time: '15분 전',
        },
      ]
    },
    length() {
      return 7000
    },
  },
}
</script>

<style scoped lang="scss">
@import './src/css/index';
.darken-1 {
  background-color: rgba(21, 21, 21, 0.8);
}

.px-2 {
  padding: 0 8px;
}

.v-list-item__content {
  text-align: left;
  padding: 16px 16px;
}

.v-list-item__content:first-child {
  padding: 0;
}

.v-list-item__content .d-flex {
  display: flex;
  align-items: baseline;
  gap: 0 8px;

  .board {
    width: 100px;
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: #5f5f5f;
  }
}

.v-virtual-scroll {
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background-color: #121212;
    border-radius: 10px;
    box-shadow: inset 0 0 5px #121212;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #7e7e7e;
    border-radius: 999px;
  }
}
</style>
