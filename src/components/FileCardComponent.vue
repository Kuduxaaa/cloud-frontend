<template>
  <div class="file">
    <img :src="determinFileIcon(name)" :alt="name" draggable="false" />

    <div class="info">
      <p class="name">{{ name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileCardComponent',

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

  methods: {
    determinFileIcon(fileName) {
      return this.$utils.determinFileIcon(fileName)
    }
  }
}
</script>

<style scoped>
.file {
  background-color: var(--color-light);
  border-radius: 30px;
  text-align: center;
  width: 240px;
  height: 270px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.file:hover {
  border: 6px solid var(--color-primary);
}

.file img {
  width: 115px;
  user-select: none;
  margin-bottom: 20px;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.info p.name {
  font-size: 18px;
  margin: 0;
  color: var(--color-dark);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px;
}
</style>
