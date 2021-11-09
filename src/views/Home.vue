<template>
  <Button title="Select File" @click="visible = !visible"/>
  <FileManager 
    :visible="visible" :name="directory.name" 
    :files="directory.files" :folders="directory.folders" 
    :loading="loading" :error="error"
    :checked="isFileSelected()"
    @update:checked="add"
    @change="changeDirectory"
  />
</template>

<script>
// @ is an alias to /src
import Button from '@/components/Button/index.vue'
import FileManager from '@/components/FileManager/index.vue'
import { getDirectory } from '@/utils/useDirectory.js'
import { reactive, toRefs } from 'vue'

export default {
  name: 'Home',
  components: {
    Button,
    FileManager
  },
  setup() {
    const state = reactive({
      directory: {
        name: 'Torstraße 145, 39481 Nürnberg',
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
