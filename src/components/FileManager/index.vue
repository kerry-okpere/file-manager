<template>
  <transition>
    <div v-if="visible" class="overlay">
      <header class="overlay-head">
        <div class="overlay-head-title">
          <div class="overlay-icon" v-if="parentFolderId !== undefined">
            <ArrowLeftOutlined :style="{fontSize: '1.3rem', color: '#595959'}"/>
          </div>
          <h2>{{ name }}</h2>
          </div>
        <div class="overlay-icon">
          <CloseOutlined @click="$emit('close')" :style="{fontSize: '1.3rem', color: '#595959'}"/>
        </div>
      </header>
      
      <div v-if="error" class="overlay-msg">
        <p>An error occurred, Please refresh this page</p>
      </div>

      <div v-else-if="loading" class="overlay-msg">
        <p>Fetching directory...</p>
      </div>
      
      <div v-else-if="folders.length < 1 && files.length < 1" class="overlay-msg">
        <div>
          <FolderOpenOutlined :style="{fontSize: '2rem', color: '#767676'}"/>
          <p>This directory is empty</p>
        </div>
      </div>
      
      <div v-else class="overlay-body">
        <!-- folders -->
        <DirectoryItem type="folder" v-for="folder in folders" :key="folder.id" :name="folder.name" @click="$emit('change', folder)"/>
        
        <!-- files -->
        <DirectoryItem v-for="file in files" :key="file.id" :name="file.name" :checked="isFileSelected()"
          :type="typeOfItem(file.mimeType)" 
          :disabled="typeOfItem(file.mimeType) === 'file:others'"
          :image="typeOfItem(file.mimeType) === 'file:img' ? file.url : ''" 
          @update:checked="$emit('update:checked', {checked: $event, file})" />
          <!-- :checked="typeOfItem(file.mimeType) !== 'file:others' ? isFileSelected() : false" -->
      </div>
      <footer class="overlay-footer">
        <Button :title="`Select ${2} Files`"/>
      </footer>
    </div>
  </transition>
</template>

<script>
import DirectoryItem from '@/components/DirectoryItem/index.vue'
import Button from '@/components/Button/index.vue'
import { ArrowLeftOutlined, FolderOpenOutlined, CloseOutlined } from '@ant-design/icons-vue'

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
    },
    parentFolderId: {
      required: true,
      validator: function(value) {
        return (value == null || typeof value == 'string')
      }
    }
  },
  setup(props) {
    const isFileSelected = file => {
      return true
    }
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
      isFileSelected,
      typeOfItem
    }
  },
  emits: ['update:checked', 'change', 'close'],
  components: {
    DirectoryItem,
    ArrowLeftOutlined,
    FolderOpenOutlined,
    CloseOutlined,
    Button
  }
}
</script>
<style lang="scss" scoped>
@import './_index.scss';
</style>
