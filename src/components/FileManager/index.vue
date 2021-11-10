<template>
  <transition name="fade">
    <div v-if="visible" class="overlay">
      <header class="overlay-head">
        <div class="overlay-head-title">
          <div class="overlay-icon" v-if="parentFolderId !== undefined" @click="$emit('back')">
            <ArrowLeftOutlined :style="{fontSize: '1.3rem', color: '#595959'}"/>
          </div>
          <h2>{{ name }}</h2>
          </div>
        <div class="overlay-icon" @click="$emit('close')">
          <CloseOutlined :style="{fontSize: '1.3rem', color: '#595959'}"/>
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
        <Folder v-for="(folder, index) in folders" :key="folder.id" :name="folder.name" @click="$emit('change', {index, folder})"/>
        
        <File v-for="file in files" :key="file.id" :name="file.name" :checked="isFileSelected(file)"
          :type="typeOfItem(file.mimeType)" 
          :disabled="typeOfItem(file.mimeType) === 'file:others'"
          :image="typeOfItem(file.mimeType) === 'file:img' ? file.url : ''" 
          @update:checked="$emit('selectFile', {checked:$event, file})" />
      </div>
      <footer class="overlay-footer">
        <Button :title="btnTitle" :disabled="selected.length < 1" @click="$emit('complete')" />
      </footer>
    </div>
  </transition>
</template>

<script>
import File from '@/components/File/index.vue'
import Button from '@/components/Button/index.vue'
import Folder from '@/components/Folder/index.vue'
import { typeOfItem } from '@/utils/index.js'
import { ArrowLeftOutlined, FolderOpenOutlined, CloseOutlined } from '@ant-design/icons-vue'
import { computed } from '@vue/reactivity'

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
    },
    selected: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const btnTitle = computed(() => {
      return props.selected.length > 0 ? `Select ${props.selected.length} Files` : 'Select Files'
    })

    // methods
    const isFileSelected = file => {
      let index = props.selected.findIndex(({id}) => id === file.id)
      return index >= 0
    }
    
    return {
      btnTitle,
      typeOfItem,
      isFileSelected,
    }
  },
  emits: ['change', 'close', 'back', 'complete', 'selectFile'],
  components: {
    Folder,
    File,
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
