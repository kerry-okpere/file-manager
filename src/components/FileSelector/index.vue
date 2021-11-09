<template>
  <div class="fileSelector">
    <Button title="Select File" @click="visible = !visible"/>
    <FileManager class="fileSelector-overlay"
      :visible="visible" :name="directory.name" 
      :files="directory.files" :folders="directory.folders"
      :parentFolderId="directory?.parentFolderId" 
      :loading="loading" :error="error"
      :checked="isFileSelected()"
      @update:checked="add"
      @change="changeDirectory"
      @close="visible = !visible"
    />
  </div>
</template>

<script>
import Button from '@/components/Button/index.vue'
import FileManager from '@/components/FileManager/index.vue'
import { getDirectory } from '@/utils/useDirectory.js'
import { computed, reactive, toRefs } from 'vue'

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
      duplicatedDirectory: {

      },
      loading: false,
      error: false,
      visible: false,
      prevDirectoryRef: {},
    })
    

    // methods
    const isFileSelected = file => {
      return true
    }
    const changeDirectory = folder => {
      state.prevDirectoryRef = {}
      state.directory = {...folder}
      console.log('folder', folder)
      // if parent = null return to initial
      // if parent = '' find folder with that id and populate
    }
    const add = file => {
      console.log('file', file)
    }
    const fetchDirectory = async () => {
      state.error = false
      state.loading = true

      try {
        const response = await getDirectory()
        state.directory = {...state.directory, ...response}
        state.duplicatedDirectory = {...state.directory, ...response}
        console.log(response)
      } catch (error) {
        state.error = true
        console.log(error)
      }

      state.loading = false
    }

    // onCreated
    fetchDirectory()

    return {
      isFileSelected,
      changeDirectory,
      ...toRefs(state),
      add
    }
  },
}
</script>
<style lang="scss" scoped>
@import './_index.scss';
</style>