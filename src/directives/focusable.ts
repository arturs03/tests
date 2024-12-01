import type { Directive } from 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    vFocusable: Directive<HTMLElement>
  }
}

export default {
  mounted: (el: HTMLElement) => {
    el.setAttribute('tabindex', '0')
  },
} as Directive<HTMLElement, undefined>
