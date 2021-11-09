<template>
  <div>
    <!-- folder view -->
    <div v-if="type === 'folder'" @click="$emit('click')" :class="['folder']">
      <div class="folder-title">
        <div class="folder-icon">
          <FolderOutlined :style="{fontSize: '1.25rem', color: '#767676'}" />
        </div>
        <p>{{ name }}</p>
      </div>
      <RightOutlined :style="{fontSize: '1.25rem', color: '#767676'}" />
    </div>

    <!-- file view -->
    <div v-else @click="onClick" :class="['file', {'file-disabled': disabled}]">
      <div class="file-title">
        <div v-if="type == 'file:img'" class="file-image">
          <img :src="image" :alt="`${name} image`">
        </div>
        <div v-else class="file-icon">
          <FilePdfOutlined v-if="type === 'file:pdf'" :style="{fontSize: '1.25rem', color: '#767676'}"  />
          <FileZipOutlined v-else :style="{fontSize: '1.25rem', color: '#D9D9D9'}"/>
        </div>
        <p>{{ name }}</p>      
      </div>
      <Checkbox ref="checkbox" v-if="checked" :modelValue="checked" @update:checked=" "/>
    </div>
  </div>
</template>
<script>
import Checkbox from '@/components/Checkbox/index.vue'
import { computed, ref } from 'vue'
import { FilePdfOutlined, CheckOutlined, FolderOutlined, RightOutlined, FileZipOutlined } from '@ant-design/icons-vue'

export default {
  name: 'DirectoryItem',
  props: {
    type: {
      type: String,
      required: true,
      validator: function(value){
        return ['folder', 'file:img', 'file:pdf', 'file:others'].includes(value)
      }
    },
    image: {
      type: String
    },
    name: {
      type: String,
      required: true
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const isSelected = computed(() => props.type == 'file:img' || props.type == 'file:pdf' && props.checked)
    const checkbox = ref(null)
    const onClick = event => {
      console.log(checkbox.value)
      if(!props.disabled){
        emit('update:checked', event)
      }
    }
    
    return { isSelected, onClick, checkbox }
  },
  emits: ['update:checked', 'click'],
  components: {
    Checkbox,
    FilePdfOutlined, 
    CheckOutlined, 
    FolderOutlined, 
    RightOutlined,
    FileZipOutlined
  }
}
</script>
<style lang="scss" scoped>
@import './_index.scss';
</style>