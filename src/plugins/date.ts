import type { Plugin } from 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    $date: (dateInput: string | Date) => string
  }
}

export default {
  install: (app) => {
    app.config.globalProperties.$date = (dateInput: string | Date) => {
      const date = new Date(dateInput)
      if (isNaN(date.getTime())) {
        return 'Invalid Date'
      }

      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')

      return `${year}/${month}/${day}`
    }
  },
} as Plugin
