export function useVoteQueue<T = any, E = any>() {
  interface VoteItem {
    items: T[]

    /**
     * 额外存储
     */
    extra?: E
  }

  interface VoteHistory extends VoteItem {
    winnerIndex: number
  }

  const history = shallowReactive<VoteHistory[]>([])
  const queue = shallowReactive<VoteItem[]>([])

  function createVoteItem(items: T[], extra?: E) {
    return { items, extra }
  }

  function createHistory(winnerIndex: number, voteItem: VoteItem) {
    return { winnerIndex, ...voteItem }
  }

  /**
   * 当前比较项的完整数据
   */
  const currentData = computed(() => queue.length ? queue[0] : undefined)

  /**
   * 当前比较项列表
   */
  const current = computed(() => currentData.value?.items)

  function pushVote(items: T[], extra?: E) {
    queue.push(createVoteItem(items, extra))
  }

  function popVote() {
    return queue.shift()
  }

  function voteFor(winnerIndex: number) {
    const item = popVote()
    if (!item) {
      return undefined
    }
    const newHistory = createHistory(winnerIndex, item)
    history.push(newHistory)
    return newHistory
  }

  return {
    current,
    currentData,
    history: readonly(history),
    votes: readonly(queue),
    pushVote,
    popVote,
    voteFor,
  }
}
