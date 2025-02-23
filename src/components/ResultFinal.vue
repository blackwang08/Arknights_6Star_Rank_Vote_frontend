<script setup lang="ts">
defineProps(['tbodyStyle'])

const { data } = useApi('view_final_order').get().json()

const labels = [
  { text: '干员代号', key: 'name', style: { width: '9em' } },
  { text: '胜率', key: 'rate', style: { width: '6em' } },
  { text: '得分', key: 'score', style: { width: '9em' } },
]

</script>

<template>
  <VoteTable v-if="data" :data="data" :labels="labels" cluster-key="rate" :tbody-style="tbodyStyle" />
</template>
