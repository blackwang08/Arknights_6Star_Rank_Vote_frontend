<script setup lang='ts'>
interface NewCompareResponse {
  left: number
  right: number
  code: string
}

const { operator: opter1, update: upOpter1 } = useOperator()
const { operator: opter2, update: upOpter2 } = useOperator()

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
  onFetchResponse,
  onFetchError,
  execute,
} = useFetch<NewCompareResponse>('new_compare', { immediate: false })
  .post(compareBody)
  .json()

/**
 * 切换对比的干员
 */
function changeOperators() {
  execute()
}

onFetchResponse(() => {
  if (!data.value)
    return

  upOpter1(data.value.left)
  upOpter2(data.value.right)
  code.value = data.value.code
})

const errorTimes = ref(0)
onFetchError(() => {
  if (errorTimes.value > 0) {
    errorTimes.value = 0
    return
  }
  errorTimes.value++
  execute()
})

onMounted(() => {
  execute()
})

// vote
// -----------------------------------------------------------

const { assignWinner, assignLoser } = useLocalVote()

const voteTimes = useStorage(STORAGE_KEYS.VOTE_TIMES, 0)

const winnerId = ref<null | number>(null)
const loserId = ref<null | number>(null)

const voteBody = computed(() => {
  return {
    code: code.value,
    win_id: winnerId.value,
    lose_id: loserId.value,
  }
})

function afterVote() {
  const winnerName = ensureOperatorName(winnerId.value)
  const loserName = ensureOperatorName(loserId.value)
  if (!winnerName || !loserName)
    return

  assignWinner(winnerName)
  assignLoser(loserName)

  voteTimes.value++

  winnerId.value = null
  loserId.value = null

  changeOperators()
}

const { execute: voteExecute, onFetchFinally: onVoteFinally, onFetchError: onVoteError } = useApi('save_score', { immediate: false }).post(voteBody)

// FIXME: 待确认
onVoteFinally(() => {
  afterVote()
})

onVoteError((...params) => {
  console.error('上传数据出现错误', ...params)
})

function voteForWinner(name?: OperatorName) {
  if (!name) {
    return
  }

  const [winner, loser] = name === opter1.name ? [opter1, opter2] : [opter2, opter1]

  winnerId.value = winner.id!
  loserId.value = loser.id!

  voteExecute()
}
</script>

<template>
  <button @click="changeOperators">
    换一组
  </button>
  <Container class="operator-vote">
    <OperatorAvatar class="operator" :target="opter1.name" :hover-filter="true" @click="voteForWinner(opter1.name)" />
    <slot />
    <OperatorAvatar class="operator" :target="opter2.name" :hover-filter="true" @click="voteForWinner(opter2.name)" />
  </Container>
</template>

<style scoped>
.operator-vote {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.operator {
  cursor: pointer;
}
</style>
