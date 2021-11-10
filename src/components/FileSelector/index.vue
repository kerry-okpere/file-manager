<template>
  <div class="fileSelector">
    <div class="fileSelector-container">
      <div class="fileSelector-content">
        <Button title="Select Files" @click="open"/>
        <FileManager class="fileSelector-overlay"
          :visible="visible" :name="directory.name" 
          :files="directory.files" :folders="directory.folders"
          :parentFolderId="directory?.parentFolderId" 
          :loading="loading" :error="error"
          :selected="tempFileStorage"
          @back="goToParentDirectory"
          @change="changeDirectory"
          @close="handleClose"
          @complete="complete"
          @selectFile="handleSelect"
        />
      </div>
      <div v-if="selectedFiles.length > 0" class="fileSelector-files">
        <h3 class="fileSelector-title">Files Selected</h3>
        <p v-for="file in selectedFiles" :key="file.id">{{ file.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button/index.vue'
import FileManager from '@/components/FileManager/index.vue'
import { getDirectory, whichLevel } from '@/utils/index.js'
import { reactive, toRefs } from 'vue'

export default {
  name: 'FileSelector',
  components: {
    Button,
    FileManager
  },
  setup() {
    const state = reactive({
      directory: {
        name: 'Torstraße 145, 39481 Nürnberg',
      },
      root: {
        name: 'Torstraße 145, 39481 Nürnberg',
      },
      loading: false,
      error: false,
      visible: false,
      tracker: [],
      tempFileStorage: [],
      selectedFiles: []
    })
    // methods
    const handleSelect = data => {
       if(data.checked){
        state.tempFileStorage.push(data.file)
      }else {
        state.tempFileStorage = state.tempFileStorage.filter(({id}) => id !== data.file.id)
      }
    }
    const changeDirectory = ({index, folder}) => {
      state.tracker.push(index)
      state.directory = {...folder}
    }
    const open = () => {
      state.tempFileStorage = [...state.selectedFiles]
      state.directory = {...state.root}
      state.visible = true
    }
    const handleClose = () => {
      state.tempFileStorage = []
      state.visible = false
      state.tracker = []
    }
    const complete = () => {
      state.selectedFiles = [...state.tempFileStorage]
      state.visible = false
      state.tracker = []
    }
     const goToParentDirectory = () => {
      state.tracker.pop()
      if(state.tracker.length < 1){
        state.directory = {...state.root}
      } else {
        state.directory = whichLevel(state.root, state.tracker)
      }      
    }
    const fetchDirectory = async () => {
      state.error = false
      state.loading = true

      try {
        const response = await getDirectory('https://api-dev.reo.so/api/folderStructure')
        state.root = {...state.root, ...response}
        state.directory = {...state.root}
      } catch (error) {
        state.error = true
      }

      state.loading = false
    }

    // onCreated
    fetchDirectory()

    return {
      changeDirectory,
      goToParentDirectory,
      ...toRefs(state),
      complete,
      open,
      handleClose,
      handleSelect
    }
  },
}
</script>
<style lang="scss" scoped>
@import './_index.scss';
</style>