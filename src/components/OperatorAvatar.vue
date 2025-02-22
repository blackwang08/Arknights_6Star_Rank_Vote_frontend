<script setup lang="ts">
const { target } = defineProps<{
  target?: OperatorTarget
  hoverFilter?: boolean
}>()

const operator = computed(() => target ? findOperator(target) : undefined)
</script>

<template>
  <div class="operator" :class="{ 'operator-filter': hoverFilter }">
    <div class="avatar-container">
      <img v-if="operator" class="avatar" :src="operator.avatar" width="180" height="360">
    </div>
    <div class="zh name">
      {{ operator?.name }}
    </div>
  </div>
</template>

<style scoped>
.operator {
    position: relative;
}

.avatar {
    width: 100%;
    object-fit: cover;
}

.name {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 1px;
    text-align: center;
    color: var(--c-bg-elv);
}

.operator-filter:hover {
    filter: var(--drop-shadow-1);
    transition: filter .1s ease-in-out;
}

.avatar-container {
    position: relative;
    width: 180px;
    aspect-ratio: 1 / 2;
}
</style>
