<template>
  <div>
    <Profile></Profile>
    <Table />
  </div>
</template>

<script>
import Table from '@/views/components/admin/common/Table'
import Profile from '@/views/components/common/profile/Profile'

export default {
  name: 'ComponentPage2',
  components: { Profile, Table },
}
</script>

<style scoped lang="scss"></style>
