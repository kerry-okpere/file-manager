<template>
  <label class="checkbox">
    <input type="checkbox" :disabled="disabled" :checked="modelValue" @change="$emit('update:modelValue', $event.target.checked)">
    <span>
      <CheckOutlined v-show="modelValue" :style="{fontSize: '.65rem', color: '#fff'}" />
    </span>
  </label>
</template>
<script>
import { CheckOutlined } from '@ant-design/icons-vue'

export default {
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    disabled: {
      type: Boolean, 
      default: false
    }
  },
  emits: ['update:modelValue'],
  components: {
    CheckOutlined
  }
}
</script>
<style lang="scss" scoped>
@import './_index.scss';
</style>