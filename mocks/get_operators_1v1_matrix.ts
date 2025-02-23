import type { MockMethod } from 'vite-plugin-mock'

import data from './data/matrix.json'

export default [
  {
    url: '/get_operators_1v1_matrix',
    method: 'post',
    response: () => {
      return data
    },
  },
] as MockMethod[]
