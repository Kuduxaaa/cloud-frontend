<template>
  <div class="upgrade">
    <h2>Storage</h2>

    <ProgressBarComponent :progress="30" />

    <p class="storage-left">2.8GB of 6GB</p>

    <button @click="upgrade" class="upgrade-button">Upgrade now</button>
  </div>
</template>

<script>
import ProgressBarComponent from './ProgressBarComponent.vue'

export default {
  name: 'StorageUpgradeComponent',

  data() {
    return {
      upgradeMessage: 'Upgrade to Premium',
      upgradeButton: 'Upgrade Now'
    }
  },

  components: {
    ProgressBarComponent
  },

  methods: {
    upgrade() {
      alert(this.upgradeMessage)
    }
  }
}
</script>

<style scoped>
.upgrade {
  background-color: var(--color-dark-secondary);
  width: 100%;
  border-radius: 20px;
  padding: 24px 19px;
}

.storage-left {
  font-size: 18px;
  color: var(--color-gray);
  margin-top: 16px;
}

.upgrade-button {
  width: 100%;
  margin-top: 24px;
}
</style>
