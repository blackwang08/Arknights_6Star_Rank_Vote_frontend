<script setup lang='ts'>
import draggable from 'vuedraggable'

interface ListItem {
  name: OperatorName
  index: number
}

function getInitListItems() {
  const list: ListItem[] = []
  getOperators().forEach(v => list.push({ name: v.name, index: v.index }))
  return list
}

const unselectedList = ref<ListItem[]>(getInitListItems())
const selectedList = defineModel<ListItem[]>()
</script>

<template>
  <div class="matrix-transfer">
    <div class="list">
      <h3>干员</h3>
      <draggable
        class="unselected-list draggable-list"
        :list="unselectedList"
        :animation="300"
        group="opter"
        item-key="index"
      >
        <template #item="{ element, index }">
          <div class="list-item">
            {{ element.name }} {{ index }}
          </div>
        </template>
      </draggable>
    </div>

    <div class="list">
      <h3>已选</h3>
      <draggable
        class="selected-list draggable-list"
        :list="selectedList"
        :animation="300"
        group="opter"
        item-key="index"
      >
        <template #item="{ element, index }">
          <div class="list-item">
            {{ element.name }} {{ index }}
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<style scoped>
.matrix-transfer {
  display: flex;
  flex-flow: row nowrap;
  gap: 20px;
}

.draggable-list {
    width: 170px;
    height: 300px;
    overflow: auto;
}

.list-item {
    padding: .5em;
    text-align: center;
    cursor: pointer;
}

.list-item {
    border:1px solid var(--c-border);
}

.list-item:not(:first-of-type) {
    border-top: none;
}
</style>
