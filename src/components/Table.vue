<script setup lang="ts">
import type { CSSProperties } from 'vue'

interface KeyLabel {
  text: string
  key: string
  style?: CSSProperties
}

interface TransformLabel {
  text: string
  transform: (col: number) => string | number
  style?: CSSProperties
}

export interface TableProps {
/**
 * key 是
 */
  data: Record<string, any[]>
  labels: (KeyLabel | TransformLabel)[]

  /**
   * 哪列作为唯一标识
   */
  idkey?: string
  tbodyStyle?: CSSProperties

  title?: string
}

const props = defineProps<TableProps>()

const trs = computed(() => props.idkey ? props.data[props.idkey] : props.data[Object.keys(props.data)[0]])

function isKeyLabel(label: KeyLabel | TransformLabel): label is KeyLabel {
  return Object.hasOwnProperty.call(label, 'key')
}
</script>

<template>
  <table>
    <caption>
      <span
        v-if="title"
        class="title"
      >
        {{ title }}
      </span>
      <slot name="caption" />
    </caption>
    <thead>
      <tr>
        <th
          v-for="label in labels"
          :key="label.text"
          :style="label.style"
        >
          {{ label.text }}
        </th>
      </tr>
    </thead>
    <tbody :style="tbodyStyle">
      <slot name="tbody">
        <tr
          v-for="(k, col) in trs"
          :key="idkey ? k : col"
        >
          <td
            v-for="(label, index) in labels"
            :key="index"
            :style="label.style"
          >
            {{
              isKeyLabel(label) ? data[label.key][col] : label.transform(col)
            }}
          </td>
        </tr>
      </slot>
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
    display: flex;
    justify-content: space-between;
}

.title {
    flex: 1;
    font-size: 1.2em;
    font-weight: bold;
    text-align: left;
}

thead {
    position: sticky;
    top: 0;
}

tbody {
    overflow: auto;
}

th,
:slotted(td) {
    margin: 0;
    padding: 6px;
    text-align: center;
    border: 1px solid #ccc;
    border: none;
}
</style>
