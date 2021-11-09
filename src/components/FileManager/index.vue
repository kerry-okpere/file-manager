<template>
  <transition>
    <div v-if="visible">
      <p>{{ name }}</p>
      <div v-if="error">
        <p>An error occurred, Please refresh this page</p>
      </div>
      <div v-else-if="loading">
        <p>Fetching directory...</p>
      </div>
      <div v-else-if="folders.length < 1 && files.length < 1">
        <!-- empty icon -->
        <p>This directory is empty</p>
      </div>
      <div v-else>
        <!-- folders -->
        <DirectoryItem type="folder" v-for="folder in folders" :key="folder.id" :name="folder.name" @click="$emit('change', folder)"/>
        
        <!-- files -->
        <DirectoryItem v-for="file in files" :key="file.id" :name="file.name" :checked="checked"
          :type="typeOfItem(file.mimeType)" 
          :disabled="typeOfItem(file.mimeType) === 'file:others'"
          :image="typeOfItem(file.mimeType) === 'file:img' ? file.url : ''" 
          @update:checked="$emit('update:checked', {checked: $event, file})" />
          <!-- :checked="typeOfItem(file.mimeType) !== 'file:others' ? isFileSelected() : false" -->
      </div>
    </div>
  </transition>
</template>

<script>
import DirectoryItem from '@/components/DirectoryItem/index.vue'

export default {
  name: 'FileManager',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true
    },
    folders: {
      type: Object,
      default: {}
    },
    files: {
      type: Array,
      default: []
    },
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    // const isFileSelected = info => {
    //   return true
    // }
    const typeOfItem = type => {
      if(type === 'image/png' || type === 'image/jpeg'){
        return 'file:img'
      }
      if(type === 'application/pdf'){
        return 'file:pdf'
      }
      return 'file:others'
    }
    return {
      // isFileSelected,
      typeOfItem
    }
  },
  emits: ['update:checked', 'change'],
  components: {
    DirectoryItem
  }
}
</script>
