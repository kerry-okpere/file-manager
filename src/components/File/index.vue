<template>
  <div @click="onClick" :class="['file', {'file-disabled': type == 'file:others'}]">
    <div class="file-title">
      <div :class="[type == 'file:img' ? 'file-image': 'file-icon']">
        <img v-if="type == 'file:img'" :src="image" :alt="`${name} image`">
        <FilePdfOutlined v-else-if="type === 'file:pdf'" :style="{fontSize: '1.25rem', color: '#767676'}"  />
        <FileExclamationOutlined v-else :style="{fontSize: '1.25rem', color: '#D9D9D9'}"/>
      </div>
      <p>{{ name }}</p>      
    </div>
    <Checkbox v-if="checked" :modelValue="checked" 
      @update:modelValue="$emit('update:checked', $event)" />
  </div>
</template>
<script>
import Checkbox from '@/components/Checkbox/index.vue'
import { FilePdfOutlined, CheckOutlined, RightOutlined, FileExclamationOutlined } from '@ant-design/icons-vue'

export default {
  name: 'DirectoryItem',
  props: {
    type: {
      type: String,
      required: true,
      validator: function(value){
        return ['file:img', 'file:pdf', 'file:others'].includes(value)
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
  },
  setup(props, { emit }) {
    const onClick = () => {
      if(props.type !== 'file:others'){
        emit('update:checked', !props.checked)
      }
    }
    
    return { onClick }
  },
  emits: ['update:checked'],
  components: {
    Checkbox,
    FilePdfOutlined, 
    CheckOutlined, 
    RightOutlined,
    FileExclamationOutlined
  }
}
</script>
<style lang="scss" scoped>
@import './_index.scss';
</style>