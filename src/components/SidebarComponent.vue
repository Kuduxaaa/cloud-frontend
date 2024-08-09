<template>
  <aside class="sidebar">
    <div class="logo">
      <RouterLink :to="{ name: 'home' }">
        <img src="~@/assets/images/logo.png" alt="Logo" draggable="false" />
      </RouterLink>
    </div>

    <div class="menu">
      <div class="item" v-for="item in items" :key="item.label">
        <RouterLink :to="item.route">
          <div :class="currentRoute === item.route ? 'menu-item selected' : 'menu-item'">
            <i :class="'bi bi-' + item.icon"></i>
            <span class="menu-label">{{ item.label }}</span>
          </div>
        </RouterLink>
      </div>
    </div>

    <div class="upgrade-card">
      <StorageUpgradeComponent />
    </div>
  </aside>
</template>

<script>
import StorageUpgradeComponent from './StorageUpgradeComponent.vue'

export default {
  name: 'DashboardComponent',

  components: {
    StorageUpgradeComponent
  },

  data() {
    return {
      items: [
        {
          label: 'Files',
          icon: 'folder-fill',
          route: '/'
        },
        {
          label: 'Photos',
          icon: 'images',
          route: '/photos'
        },
        {
          label: 'Recent',
          icon: 'clock',
          route: '/recent'
        },
        {
          label: 'Favirites',
          icon: 'star',
          route: '/favorites'
        },
        {
          label: 'Shared links',
          icon: 'link-45deg',
          route: '/shared-links'
        },
        {
          label: 'Trash',
          icon: 'trash2',
          route: '/trash'
        }
      ],

      currentRoute: null
    }
  },

  mounted() {
    this.currentRoute = this.$route.path
  },

  watch: {
    $route: {
      handler: function (route) {
        this.currentRoute = route.path
      },

      immediate: true
    }
  }
}
</script>

<style scoped>
.sidebar {
  background-color: var(--color-dark);
  color: var(--color-light);
  width: var(--sidebar-width);
  position: fixed;
  height: 100vh;
}

.sidebar .logo {
  padding: 40px;
}

.menu {
  padding: 21px 40px;
  height: calc(100% - 418px);
  overflow-x: auto;
}

.sidebar .logo img {
  width: calc(var(--sidebar-width) - 190px);
}

.menu,
.menu-item,
.menu-item a {
  width: 100%;
}

.menu-item {
  padding: 9px 14px;
  border-radius: 12px;
}

.bi {
  margin: 0px 12px 0px 4px;
  font-size: 24px;
}

.menu-item.selected {
  background-color: var(--color-primary);
  color: var(--color-white);
  font-weight: 500;
}

.menu-item:hover:not(.menu-item.selected) {
  background-color: #5a628354;
  color: #ddd;
}

.menu-label {
  line-height: 20px;
}

a {
  color: var(--color-gray);
  font-size: 21px;
}

.item {
  margin-top: 14px;
}

.upgrade-card {
  position: absolute;
  width: calc(100% - (40px * 2));
  /* Full width - (Margin * Horizontally Side) */

  bottom: 0;
  margin: 40px;
}

@media only screen and (max-width: 1000px) {
  .sidebar {
    width: 100%;
    height: inherit;
    bottom: 0;
    left: 0;
    background-color: var(--color-dark-transperent);
    backdrop-filter: blur(10px);
  }

  .upgrade-card,
  .menu-label,
  .logo {
    display: none;
  }

  .menu {
    display: flex;
    justify-content: center;
    padding: 12px 8px;
  }

  .item {
    width: calc(100% / 6);
    margin: 0;
  }

  .menu-item {
    text-align: center;
  }

  .bi {
    margin: 0;
  }
}
</style>
