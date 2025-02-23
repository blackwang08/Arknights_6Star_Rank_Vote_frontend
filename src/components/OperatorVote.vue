<script setup lang='ts'>
interface NewCompareResponse {
  left: number
  right: number
  code: string
}

const { current: currentVote, voteFor, pushVote, popVote } = useVoteQueue<Operator>()

// resource
// -----------------------------------------------------------
const code = useStorage(STORAGE_KEYS.VOTE_CODE, '000')

const compareBody = computed(() => {
  return {
    code: code.value,
  }
})

const {
  data,
  isFetching: newCompareIsFetching,
  onFetchResponse,
  onFetchError,
  execute: loadVote,
} = useFetch<NewCompareResponse>('new_compare', { immediate: false })
  .post(compareBody)
  .json()

/**
 * 切换对比的干员
 */
function skipCurrentVote() {
  popVote()
  loadVote()
}

onFetchResponse(() => {
  if (!data.value)
    return

  const opter1 = findOperator(data.value.left)
  const opter2 = findOperator(data.value.right)

  if (opter1 && opter2) {
    pushVote([opter1, opter2])
  }
  else {
    console.error(
      '未找到对应的干员',
      data.value.left,
      data.value.right,
    )
  }

  code.value = data.value.code
})

const errorTimes = ref(0)
onFetchError(() => {
  if (errorTimes.value > 0) {
    errorTimes.value = 0
    return
  }
  errorTimes.value++
  loadVote()
})

onMounted(() => {
  loadVote()
})

// vote local
// -----------------------------------------------------------

const { assignWinner, assignLoser } = useLocalVote()

const voteTimes = useStorage(STORAGE_KEYS.VOTE_TIMES, 0)
function updateLocalVote(winnerName: OperatorName, loserName: OperatorName) {
  assignWinner(winnerName)
  assignLoser(loserName)

  voteTimes.value++
}

// vote server
// -----------------------------------------------------------

async function upLoadVote(winnerId: number, loserId: number) {
  return useApi('save_score').post(
    {
      code: code.value,
      win_id: winnerId,
      lose_id: loserId,
    },
  )
}

// vote
// -----------------------------------------------------------

async function voteForWinner(winnerIndex: number) {
  if (!currentVote.value)
    return

  const opter1 = currentVote.value[0]
  const opter2 = currentVote.value[1]

  const [winner, loser] = winnerIndex === 0 ? [opter1, opter2] : [opter2, opter1]

  // FIXME: 暂忽略是否上传成功
  upLoadVote(winner.id, loser.id).finally(async () => {
    updateLocalVote(winner.name, loser.name)

    await loadVote()

    nextTick(() => {
      voteFor(winnerIndex)
    })
  })
}
</script>

<template>
  <ShadowCard class="operator-vote">
    <slot name="header" />
    <div class="vote">
      <OperatorAvatar class="operator" :target="currentVote?.[0].name" :hover-filter="true" @click="voteForWinner(0)" />
      <slot name="middle" />
      <OperatorAvatar class="operator" :target="currentVote?.[1].name" :hover-filter="true" @click="voteForWinner(1)" />
    </div>
    <div class="footer">
      <slot name="footer" />
      <Button class="next-btn" :is-loading="newCompareIsFetching" @click="skipCurrentVote">
        换一组
      </Button>
    </div>
  </ShadowCard>
</template>

<style scoped>
.operator-vote {
    display: flex;
    flex-flow: column nowrap;
}

.vote {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
}

.operator-placeholder {
    width: 180px;
    height: 360px;
}

.operator {
  cursor: pointer;
}

.footer {
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
}
</style>
