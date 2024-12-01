import type { Directive } from 'vue'

declare module 'vue' {
  export interface ComponentCustomProperties {
    'v-focusable': Directive<HTMLElement, undefined>
  }
}

export default [
  'v-focusable',
  {
    mounted: (el: HTMLElement) => {
      el.setAttribute('tabindex', '0')
    },
  },
] as [string, Directive]
