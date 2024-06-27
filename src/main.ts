import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import '@/style/index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

const app = createApp(App)
app.mount('#app')
