<script setup lang='ts'>
interface ListItem {
  name: OperatorName
  index: number
}
const selectedList = ref<ListItem[]>([])
const { data } = useApi<number[][]>('get_operators_1v1_matrix').post().json()

const labels = computed(() => {
  return [
    {
      text: '',
      key: 'names',
    },
    ...selectedList.value.map((el) => {
      return {
        text: el.name,
        key: el.name,
      }
    }),
  ]
})

const showData = computed(() => {
  const displayData: Record<string, (number | string)[]> = {
    names: selectedList.value.map(el => el.name),
  }

  if (!data.value) {
    return displayData
  }

  const selected = selectedList.value
  selected.forEach(({ name, index: col }) => {
    displayData[name] = selected.map(({ index: row }) => data.value[row][col] / 100)
  })

  return displayData
})
</script>

<template>
  <div class="result-matrix">
    <ResultMatrixTransfer v-model="selectedList" />
    <Table :labels="labels" :data="showData" idkey="names" />
  </div>
</template>

<style scoped>
.result-matrix {
    display: flex;
}

:deep(th),
:deep(td) {
    width: 6em;
}
</style>
