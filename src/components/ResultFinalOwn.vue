<script setup>
defineProps(['tbodyStyle'])

const { getSortedData } = useLocalVote()

const labels = [
  { text: '干员代号', key: 'name', style: { width: '9em' } },
  { text: '胜率', key: 'rate', style: { width: '6em' } },
  { text: '得分', key: 'score', style: { width: '9em' } },
]
</script>

<template>
  <VoteTable :data="getSortedData()" :labels="labels" cluster-key="rate" :tbody-style="tbodyStyle" />
</template>
