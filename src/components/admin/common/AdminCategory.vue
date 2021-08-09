<!--
어드민 카테고리 컴포넌트
-->
<template>
  <v-card class="mx-auto category" width="300">
    <v-list class="bg-brand-primary-blue">
      <v-list-group
        v-for="(category, i) in categories"
        :key="i"
        no-action
        sub-group
      >
        <template v-slot:activator>
          <v-list-item-content style="text-align: left">
            <v-list-item-title class="h3">
              <div class="icon"><mdicon :name="category.icon" /></div>
              {{ category.name }}</v-list-item-title
            >
          </v-list-item-content>
        </template>

        <v-list-item v-for="(c, ii) in category.child" :key="ii" :to="c.link">
          <v-list-item-title class="t1" v-text="c.name"></v-list-item-title>
        </v-list-item>

        <v-list-item v-if="category.child.length < 1" :to="category.link">
          <v-list-item-title
            class="t1"
            v-text="category.name"
          ></v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'AdminCategory',
  props: {
    categories: {
      type: Array,
      required: true,
    },asdasdasd
  },
  methods: {
    activeCategory(event) {
      let categories = document.querySelectorAll(
        '.container > .category > .head',
      )
      categories.forEach(s => s.classList.remove('active'))
      event.target.parentNode.classList.add('active')
    },
  },

  mounted() {
    let categories = document.querySelectorAll('.container > .category > .head')
    categories.forEach(s => s.addEventListener('click', this.activeCategory))
  },
}
</script>

<style scoped>
.category {
  border-radius: 0 60px 0 0;
}
.icon {
  color: rgba(0, 0, 0, 0.8);
  display: inline-block;
  padding: 8px;
}
</style>
