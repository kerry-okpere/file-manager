<template>
  <button :class="['btn', type === 'secondary' ? 'btn-secondary' : 'btn-primary', {'btn-disabled': disabled}]" :disabled="disabled">
    {{ title }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'primary',
      validator: function(value){
        return ['primary', 'secondary'].includes(value)
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    
  },
}
</script>
<style lang="scss" scoped>
@import './_index.scss';
</style>
