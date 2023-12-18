/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'
import VueCookies from 'vue-cookies'

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(pinia)
    .use(router)
    .use(VueCookies)
}
