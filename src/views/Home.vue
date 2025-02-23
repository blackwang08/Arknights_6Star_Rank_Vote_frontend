<script setup lang='ts'>
import ResultFinal from '@/components/ResultFinal.vue'
import ResultMatrix from '@/components/ResultMatrix.vue'
import ResultOwn from '@/components/ResultOwn.vue'

enum PANEL_NAME {
  OWN = 'own',
  ALL = 'all',
  MATRIX = 'matrix',
}

const menus: { key: PANEL_NAME, title: string }[] = [
  { key: PANEL_NAME.OWN, title: '个人数据' },
  { key: PANEL_NAME.MATRIX, title: '1v1 矩阵' },
  { key: PANEL_NAME.ALL, title: '总数据' },
]

const components: Record<PANEL_NAME, Component> = {
  [PANEL_NAME.OWN]: ResultOwn,
  [PANEL_NAME.ALL]: ResultFinal,
  [PANEL_NAME.MATRIX]: ResultMatrix,
}

const panelVisible = ref(false)
const activeMenu = ref<PANEL_NAME | null>(null)

function openPanel() {
  if (!activeMenu.value) {
    activeMenu.value = PANEL_NAME.ALL
  }
  panelVisible.value = true
}

function closePanel() {
  panelVisible.value = false
}

function clickMenu(i: number) {
  activeMenu.value = menus[i].key
}
</script>

<template>
  <div class="wrapper">
    <div class="content" :class="{ 'hide-content': panelVisible }">
      <SiteTitle />
      <OperatorVote>
        <template #middle>
          <!-- <SiteTitle /> -->
          <!-- TODO: 此处布局 -->
          <div style="width: 1em;" />
        </template>
        <template #footer>
          <Button @click="openPanel">
            查看统计结果
          </Button>
        </template>
      </OperatorVote>
    </div>
  </div>

  <Panel v-model="panelVisible" @close="closePanel">
    <template #default>
      <KeepAlive>
        <component :is="activeMenu && components[activeMenu]" class="panel-item" :tbody-style="{ height: '70vh' }" />
      </KeepAlive>
    </template>
    <template #footer>
      <Button v-for="(menu, index) in menus" :key="menu.key" class="menu-btn" :disabled="menu.key === activeMenu" @click="clickMenu(index)">
        {{ menu.title }}
      </Button>
    </template>
  </Panel>
</template>

<style scoped>
.wrapper {
    transform-style: preserve-3d;
    perspective: 300px;
}

.content {
    transition: transform 0.4s ease;
    transform-origin: left;
    will-change: transform;
    transform: translateX(0) rotateY(0deg);
}

.hide-content {
    transform: translateX(-25%) rotateY(20deg);
}

.menu-btn {
    margin-right: 10px;
}

.menu-btn:disabled {
    cursor: default;
}
</style>
