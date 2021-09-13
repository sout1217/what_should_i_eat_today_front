<template>
  <div>
    <AdminCategory :categories="categories"></AdminCategory>
  </div>
</template>

<script>
import AdminCategory from '@/views/components/admin/common/AdminCategory'

export default {
  name: 'AdminMenu',
  components: {
    AdminCategory,
  },
  data: function () {
    return {
      categories: [
        {
          id: 1,
          name: '카테고리 관리',
          icon: 'react',
          child: [
            {
              id: 1,
              icon: 'react',
              name: '묶음 관리',
              link: 'test',
            },
          ],
        },
        {
          id: 2,
          name: '태그 관리',
          icon: 'react',
          link: 'test',
          child: [],
        },
      ],
    }
  },
}
</script>

<style scoped></style>
