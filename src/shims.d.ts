/**
 * 是否为开发环境
 */
declare const __DEV__: boolean

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}
