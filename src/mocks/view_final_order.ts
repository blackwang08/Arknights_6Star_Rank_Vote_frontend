import type { MockMethod } from 'vite-plugin-mock'

import data from './data/final.json'

export default [
  {
    url: '/view_final_order',
    method: 'get',
    response: () => {
      return data
    },
  },
] as MockMethod[]
