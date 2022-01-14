import { createApp } from 'vue'
import App from './App.vue'
import { VuesticPlugin } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css' 
import './assets/styles/icons.css'
import './assets/styles/fonts.css'
import './assets/styles/vuestic-overrides.css'

const app = createApp(App)
app.use(VuesticPlugin)

app.mount("#app")
