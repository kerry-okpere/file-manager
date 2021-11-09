<template>
  <section class="home">
    <FileSelector />
  </section>
</template>

<script>
import FileSelector from '@/components/FileSelector/index.vue'

export default {
  name: 'Home',
  components: {
    FileSelector,
  },
}
</script>
<style lang="scss" scoped>
.home{
  // display: flex;
  // padding-top: 10rem;
  // widows: 100%;
  // justify-content: center;
  // align-items: center;
}
</style>