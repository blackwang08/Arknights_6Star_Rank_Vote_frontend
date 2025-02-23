<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { getBestCluster } from '@/utils/getBestCluster'
import { getColors } from '@/utils/getColors'

interface Props {
  data: Record<string, any[]>
  labels: {
    text: string
    /** data 的 key */
    key?: string
    transform?: (col: number) => string | number
    style?: CSSProperties
  }[]
  /**
   * data 的 key
   * @default 'rate'
   */
  clusterKey?: string
  tbodyStyle?: CSSProperties
}

const props = defineProps<Props>()
const clusterKey = computed(() => props.clusterKey || 'rate')
const cupLevels = ['超大杯上', '超大杯中', '超大杯下', '大杯上', '大杯中', '大杯下', '中杯上', '中杯中', '中杯下']

const GVF = ref(0)
const colors = shallowRef<string[]>([])
const showLables = shallowRef<Props['labels']>([])
const showData = shallowRef<Props['data']>({})

//
// order
// -----------------------------------------

const orderLabel = {
  text: '排名',
  transform: (i: number) => i + 1,
  style: { width: '5em' },
}

//
// cup level
// -----------------------------------------

const cupLabel = {
  text: '杯级',
  key: 'cup',
  style: {
    width: '6em',
  },
}

function buildCupData(clusterItems: any[]) {
  const data: any[] = []
  clusterItems.forEach((items, i) => {
    items.forEach(() => {
      data.push(cupLevels[i])
    })
  })

  return {
    cup: data,
  }
}

//
//
// -----------------------------------------
function updateLabels() {
  showLables.value = [
    cupLabel,
    orderLabel,
    ...props.labels,
  ]
}

function updateData(clusterItems: any[]) {
  showData.value = { ...buildCupData(clusterItems), ...props.data }
}

//
// -----------------------------------------

watchEffect(() => {
  const data = props.data
  if (!data?.[clusterKey.value])
    return

  const clusterList = data[clusterKey.value].map(r => Number.parseFloat(r))
  const { data: items, GVF: gvf } = getBestCluster(clusterList)

  colors.value = getColors(items.reverse())
  GVF.value = gvf

  updateLabels()
  updateData(items)
})

function getValueByPos(col: number, label: Props['labels'][number]) {
  if (label.key) {
    return showData.value[label.key][col]
  }
  else {
    return label.transform ? label.transform(col) : ''
  }
}
</script>

<template>
  <table v-if="showData[clusterKey]">
    <caption>区分度: {{ Number.parseFloat(GVF.toFixed(4)) * 100 }}%</caption>
    <thead>
      <tr>
        <th v-for="label in showLables" :key="label.text" :style="label.style">
          {{ label.text }}
        </th>
      </tr>
    </thead>
    <tbody :style="tbodyStyle">
      <tr
        v-for="(_, col) in showData[clusterKey]" :key="col"
        :style="{ backgroundColor: `#${colors[col]}` }"
      >
        <td v-for="(label, index) in showLables" :key="index" :style="label.style">
          {{ getValueByPos(col, label) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table,
caption,
thead,
tbody,
tfoot {
    display: block;
}

table {
    border-collapse: collapse;
    margin: 0;
    padding: 0;
    overflow: auto;
}

caption {
    text-align: right;
}

thead {
    position: sticky;
    top: 0;
}

tbody {
    overflow: auto;
}

th,
td {
    margin: 0;
    padding: 8px;
    text-align: center;
    border: 1px solid #ccc;
    border: none;
}
</style>
