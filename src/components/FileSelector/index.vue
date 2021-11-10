<template>
  <div class="fileSelector">
    <Button title="Select File" @click="visible = true"/>
    <FileManager class="fileSelector-overlay"
      :visible="visible" :name="directory.name" 
      :files="directory.files" :folders="directory.folders"
      :parentFolderId="directory?.parentFolderId" 
      :loading="loading" :error="error"
      @back="goToParentDirectory"
      @change="changeDirectory"
      @close="visible = false"
      @complete="complete"
    />
    <div>
      <p v-for="file in selectedFile" :key="file.id">{{ file.name }}</p>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button/index.vue'
import FileManager from '@/components/FileManager/index.vue'
import { getDirectory, whichLevel } from '@/utils/helper.js'
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
      prevDirectoryRef: {},
      tracker: [],
      selectedFile: []
    })
    // methods

    const changeDirectory = ({index, folder}) => {
      state.tracker.push(index)
      state.directory = {...folder}
    }
    const complete = file => {
      state.selectedFile = [...file]
      state.visible = false
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
        console.log(state.root)

      } catch (error) {
        state.error = true
        console.log(error)
      }

      state.loading = false
    }

    // onCreated
    fetchDirectory()

    return {
      changeDirectory,
      goToParentDirectory,
      ...toRefs(state),
      complete
    }
  },
}
</script>
<style lang="scss" scoped>
@import './_index.scss';
</style>