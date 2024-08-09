<template>
  <div class="preview">
    <div class="file-identifier">
      <div class="icon">
        <img :src="determinFileIcon(name)" :alt="name" draggable="false" />
      </div>

      <div class="title">
        <h2>{{ name }}</h2>
      </div>
    </div>

    <div class="file-description">
      <div class="title">
        <h3>Descrpition</h3>
      </div>

      <div class="content">
        <ol type="1">
          <li v-for="description in descriptions" :key="description">{{ description }}</li>
        </ol>
      </div>
    </div>

    <div class="file-property">
      <div class="title">
        <h3>Properties</h3>
      </div>
      <div class="properties">
        <div class="property">
          <span class="title">Type</span>
          <span class="value">{{ fileType }}</span>
        </div>

        <div class="property">
          <span class="title">Full name</span>
          <span class="value">{{ name }}</span>
        </div>

        <div class="property">
          <span class="title">Size</span>
          <span class="value">{{ size }}</span>
        </div>

        <div class="property">
          <span class="title">Last modified</span>
          <span class="value">{{ date }}</span>
        </div>
      </div>
    </div>

    <div class="file-sharing">
      <div class="title">
        <h3>Share</h3>
        <p>You can share your file vie email or directly using URL.</p>
      </div>

      <div class="share-options">
        <div class="email">
          <form ref="shareViaEmail">
            <input type="email" id="email" name="email" placeholder="Enter receiver email address" required />

            <button type="submit" class="secondary">
              <i class="bi bi-share"></i>
              Send
            </button>
          </form>
        </div>

        <div class="url">
          <button class="gen-url">
            <i class="bi bi-link"></i>
            Generate URL to share.
          </button>
        </div>
      </div>
    </div>

    <div class="file-description file-preview" v-if="isOfficeFile">
      <div class="title">
        <h3>Preview</h3>
      </div>

      <div class="content">
        <DocViewerComponent url="https://example-files.online-convert.com/document/dotx/example.dotx" />
      </div>
    </div>
  </div>
</template>

<script>
import DocViewerComponent from '@/components/DocViewerComponent.vue';

export default {
  name: 'FileInfoComponent',

  props: {
    size: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    date: {
      type: String,
      required: true
    }
  },

  components: {
    DocViewerComponent
  },

  data() {
    return {
      shareViaEmail: null,
      descriptions: [],
      fileType: null,
      isOfficeFile: false
    }
  },

  mounted() {
    this.descriptions = this.$utils.getFileDescription(this.name).descriptions
    this.fileType = this.$utils.getFileType(this.name)
    this.isOfficeFile = this.$utils.isOfficeFile(this.name)
  },

  watch: {
    name: {
      handler: function (name) {
        this.descriptions = this.$utils.getFileDescription(name).descriptions
        this.fileType = this.$utils.getFileType(this.name)
        this.isOfficeFile = this.$utils.isOfficeFile(this.name)
      },

      immediate: true
    }
  },

  methods: {
    determinFileIcon(fileName) {
      return this.$utils.determinFileIcon(fileName)
    }
  }
}
</script>

<style scoped>
.preview {
  position: fixed;
  right: 0;
  height: calc(100vh - 60px);
  border-left: 2px solid var(--color-light);
  background-color: var(--color-white);
  box-shadow: -7px 0px 10px #00000008;
  overflow-x: auto;
  width: 450px;
  padding: 20px 0px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

form {
  display: flex;
  align-items: center;
}

form input {
  width: 70%;
}

form button {
  width: 30%;
  margin-left: 8px;
}

form button i.bi {
  margin-right: 12px;
}

.file-identifier {
  display: flex;
  justify-content: start;
}

.file-identifier .icon {
  width: 70px;
  height: 70px;
  background-color: var(--color-light);
  border-radius: 22px;
  margin: auto 13px;
  padding: 16px;
}

.file-identifier .icon img {
  width: 40px;
  height: 40px;
  object-fit: cover;
}

.file-identifier .title h2 {
  font-size: 24px;
  color: #000;
  font-weight: 700;
  margin-top: 12px;
  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-description,
.file-sharing {
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  border-top: 1px solid var(--color-light);
  border-bottom: 1px solid var(--color-light);
  margin-top: 40px;
}

.file-property {
  margin-top: 10px;
  padding: 25px;
}

.properties {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.file-description .title,
.file-property>.title,
.file-sharing .title {
  color: #000;
  margin-bottom: 14px;
}

h3 {
  font-size: 18px;
  font-weight: 700;
}

p {
  color: var(--color-gray);
  font-size: 16px;
}

.property {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-weight: bold;
  color: #888888;
}

.file-properties {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.property {
  display: grid;
  grid-template-columns: 150px auto;
  word-wrap: break-word;
  word-break: break-all;
}

.key {
  font-weight: bold;
  white-space: nowrap;
}

.value {
  white-space: normal;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  color: #000000;
}

.share {
  /* position: fixed; */
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: var(--color-primary);
  font-size: 28px;
  text-align: center;
}

.share .title {
  color: var(--color-white);
  line-height: 50px;
  font-weight: 700;
}

.gen-url {
  width: 100%;
  margin-top: 8px;
}

.file-description.file-preview {
  margin-bottom: 80px;
}

@media only screen and (max-width: 1000px) {
  .preview {
    width: 100%;
    height: 100vh;
    top: 0;
    border-radius: 0px;
  }

  .file-identifier {
    margin-top: 25px;
  }
}
</style>
