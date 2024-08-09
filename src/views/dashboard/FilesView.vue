<template>
  <div class="page" :style="isSelectedFileInfoValid ? 'width: calc(100% - 450px)' : 'width: 100%'">
    <div class="page-content">
      <h1>Files</h1>

      <div class="page-actions">
        <div class="title">
          <h1>My storage</h1>
        </div>

        <div class="actions">
          <button class="secondary">
            <i class="bi bi-upload"></i>
            Upload
          </button>

          <button class="secondary">
            <i class="bi bi-plus-circle"></i>
            Create
          </button>
        </div>
      </div>

      <div class="files">
        <div class="items" ref="itemsContainer">
          <div class="item" v-for="file in files" :key="file.id" @click="() => {
            openFileInfo(file.name)
          }
            " @contextmenu.prevent="showContextMenu($event, file)">
            <RecentCardComponent :name="file.name" :size="file.size" :date="file.date" />
          </div>
        </div>
      </div>
    </div>

    <div class="file-info-closer" @click="closeFileInfo" v-if="isSelectedFileInfoValid">
      <i class="bi bi-x-circle"></i>
    </div>

    <FileInfoComponent v-if="isSelectedFileInfoValid" :name="selectedFileInfo.name" :size="selectedFileInfo.size"
      :date="selectedFileInfo.date" />

    <div v-if="contextMenuVisible" :style="contextMenuStyle" class="context-menu" @click.right.prevent="false">
      <ul>
        <li @click="addToFavorites">Add to favorites</li>
        <li @click="openDetails">Open details</li>
        <li @click="showSharingOptions">Show sharing options</li>
        <li @click="editWithOffice">Edit with Nextcloud Office</li>
        <li @click="viewFile">View</li>
        <li @click="renameFile">Rename</li>
        <li @click="moveOrCopyFile">Move or copy</li>
        <li @click="setReminder">Set reminder</li>
        <li @click="editLocally">Edit locally</li>
      </ul>
    </div>
  </div>

</template>

<script>
import RecentCardComponent from '@/components/FileCardComponent.vue'
import FileInfoComponent from '@/components/FileInfoComponent.vue'

export default {
  name: 'FilesView',

  components: {
    FileInfoComponent,
    RecentCardComponent
  },

  computed: {
    isSelectedFileInfoValid() {
      return (
        this.selectedFileInfo &&
        Object.keys(this.selectedFileInfo).length > 0 &&
        this.selectedFileInfo.name !== null
      )
    }
  },

  data() {
    return {
      files: [
        {
          id: 1,
          name: 'New invoices.pdf',
          size: '10 KB',
          date: '2022-01-01'
        },
        {
          id: 2,
          name: 'Timetracking.xlsx',
          size: '500 KB',
          date: '2022-02-01'
        },

        {
          id: 3,
          name: 'Design sprint.docx',
          size: '6.0 MB',
          date: '2022-02-01'
        },

        {
          id: 4,
          name: 'NEW_logo.svg',
          size: '1.2 MB',
          date: '2022-02-01'
        },
      ],

      selectedFileInfo: null,
      contextMenuVisible: false,
      contextMenuStyle: {},
      selectedFile: null
    }
  },

  methods: {
    closeFileInfo() {
      this.selectedFileInfo = []
    },

    openFileInfo(fileName) {
      let fileInfo = this.files.find((file) => file.name === fileName)
      this.selectedFileInfo = fileInfo
    },

    showContextMenu(event, file) {
      this.selectedFile = file
      this.contextMenuStyle = {
        top: `${event.pageY}px`,
        left: `${event.pageX}px`
      }
      this.contextMenuVisible = true
    },

    hideContextMenu() {
      this.contextMenuVisible = false
    },


    addToFavorites() {
      console.log('Add to favorites', this.selectedFile)
      this.hideContextMenu()
    },

    openDetails() {
      this.selectedFileInfo = this.selectedFile
    },

    showSharingOptions() {
      console.log('Show sharing options', this.selectedFile)
      this.hideContextMenu()
    },

    editWithOffice() {
      console.log('Edit with Nextcloud Office', this.selectedFile)
      this.hideContextMenu()
    },

    viewFile() {
      console.log('View', this.selectedFile)
      this.hideContextMenu()
    },

    renameFile() {
      if (!this.selectedFile) {
        return
      }

      const fileName = this.selectedFile.name
      const lastDotIndex = fileName.lastIndexOf('.')
      const nameWithoutExtension = lastDotIndex === -1 ? fileName : fileName.slice(0, lastDotIndex)
      const extension = lastDotIndex === -1 ? '' : fileName.slice(lastDotIndex)

      this.hideContextMenu()

      this.$swal({
        title: 'Rename File',
        input: 'text',
        inputValue: fileName,
        showCancelButton: true,
        confirmButtonText: 'Rename',
        showLoaderOnConfirm: true,

        didOpen: () => {
          const input = this.$swal.getInput()

          if (input) {
            input.setSelectionRange(0, nameWithoutExtension.length)
            input.focus()
          }
        },

        preConfirm: async (newName) => {
          if (!newName || newName.trim() === '') {
            this.$swal.showValidationMessage('The file name cannot be empty')
            return false
          }

          newName = newName.trim()
          if (!newName.endsWith(extension)) {
            newName += extension
          }

          try {
            await this.$api.renameFile(this.selectedFile.id, newName)

            this.selectedFile.name = newName
            this.$snackbar.add({
              type: 'success',
              text: 'The file has been renamed successfully.'
            })

          } catch (error) {
            this.$swal.showValidationMessage(`Failed to rename the file: ${error.message}`)
            return false
          }
        },

        allowOutsideClick: () => !this.$swal.isLoading()
      })
    },

    setReminder() {
      console.log('Set reminder', this.selectedFile)
      this.hideContextMenu()
    },

    editLocally() {
      console.log('Edit locally', this.selectedFile)
      this.hideContextMenu()
    }
  },

  mounted() {
    document.addEventListener('click', this.hideContextMenu)
    // this.$swal('Hello Vue world!!!');
  },

  beforeUnmount() {
    document.removeEventListener('click', this.hideContextMenu)
  }
}
</script>

<style scoped>
.page {
  padding: 38px;
  display: flex;
}

.file-info-closer {
  font-size: 28px;
  cursor: pointer;
  position: fixed;
  z-index: 999;
  right: 20px;
  top: 40px;
  color: var(--color-gray);
}

.page-actions {
  display: flex;
  justify-content: space-between;
}

.title h1 {
  font-weight: 600;
}

button {
  margin-left: 12px;
  font-size: 18px;
  width: 140px;
}

.bi {
  margin-right: 8px;
}

.recents {
  margin-top: 20px;
}

h3 {
  font-size: 700;
}

.items {
  display: flex;
  margin-top: 24px;
  flex-wrap: wrap;
  justify-content: center;
}

.item {
  margin-right: 14px;
  margin-bottom: 14px;
}

.context-menu {
  position: absolute;
  z-index: 1000;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  border-radius: 14px;
}

.context-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.context-menu ul li {
  padding: 8px 12px;
  border-radius: 12px;
  cursor: pointer;
}

.context-menu ul li:hover {
  background: #f0f0f0;
}
</style>
