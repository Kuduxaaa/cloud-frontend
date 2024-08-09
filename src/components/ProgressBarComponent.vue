<template>
  <div class="progress">
    <div class="inside" :style="`width: ${this.progress}%`"></div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBarComponent',
  props: {
    progress: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
.progress {
  width: 100%;
  height: 6px;
  background-color: var(--color-primary-light);
  border-radius: 10px;
  margin-top: 28px;
}

.progress .inside {
  height: 100%;
  background-color: var(--color-primary);
  border-radius: 10px;
}
</style>
