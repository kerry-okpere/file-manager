<template>
  <div @click="$emit('click')">
    <div>
      <!-- icon if type is folder -->
      <!-- icon if type is pdf -->
      <!-- icon if type is others -->
      <!-- else -->
      <img :src="image" alt="" srcset="">
    </div>
    {{ name }}
    <!-- icon v-if type is folder -->
    <Checkbox v-if="type == 'file:img' || type == 'file:pdf'" 
    :modelValue="checked" @update:modelValue="$emit('update:checked', $event)"/>
  </div>
</template>
<script>
import Checkbox from '@/components/Checkbox/index.vue'

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
  setup() {
    
  },
  emits: ['update:checked', 'click'],
  components: {
    Checkbox
  }
}
</script>