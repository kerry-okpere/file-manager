<template>
  <div @click="$emit('click')" class="folder">
    <div class="folder-title">
      <div class="folder-icon">
        <FolderOutlined :style="{fontSize: '1.25rem', color: '#767676'}" />
      </div>
      <p>{{ name }}</p>
    </div>
    <RightOutlined :style="{fontSize: '1.25rem', color: '#767676'}" />
  </div>
</template>
<script>
import { FolderOutlined, RightOutlined } from '@ant-design/icons-vue'

export default {
  name: 'Folder',
  props: {
    name: {
      type: String,
      required: true
    },
  },
  emits: ['click'],
  components: {
    FolderOutlined, 
    RightOutlined
  }
}
</script>
<style lang="scss" scoped>
@import './_index.scss';
</style>