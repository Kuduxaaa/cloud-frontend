import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/dashboard/FilesView.vue'
import FavoritesView from '../views/dashboard/FavoritesView.vue'
import PhotosView from '../views/dashboard/PhotosView.vue'
import RecentView from '../views/dashboard/RecentView.vue'
import SharedLinksView from '../views/dashboard/SharedLinksView.vue'
import TrashView from '../views/dashboard/TrashView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesView
    },
    {
      path: '/photos',
      name: 'photos',
      component: PhotosView
    },
    {
      path: '/recent',
      name: 'recent',
      component: RecentView
    },
    {
      path: '/shared-links',
      name: 'SharedLinks',
      component: SharedLinksView
    },
    {
      path: '/trash',
      name: 'trash',
      component: TrashView
    }
  ]
})

export default router
