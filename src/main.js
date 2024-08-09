import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { SnackbarService } from 'vue3-snackbar'

import 'vue3-snackbar/styles'
import App from './App.vue'
import router from './router'
import utils from './utils'
import Api from './api'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const app = createApp(App)

app.config.globalProperties.$utils = utils
app.config.globalProperties.$api = Api

app.use(createPinia())
app.use(SnackbarService)
app.use(VueSweetalert2)
app.use(router)

app.mount('#app')
