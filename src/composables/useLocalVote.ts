interface LocalVoteItem {
  win_times: number
  lose_times: number
  scores: number
  vote_times: number
  win_rate: number
}

type LocalVoteResult = Record<Operator['name'], LocalVoteItem>

export function useLocalVote() {
  const data = useStorage(STORAGE_KEYS.VOTE_RESULT, {} as LocalVoteResult)

  /**
   * 创建数据项，确保类型一致
   */
  function createVoteItem(item: Partial<LocalVoteItem> = {}): LocalVoteItem {
    return { win_times: 0, lose_times: 0, scores: 0, vote_times: 0, win_rate: -1, ...item }
  }

  function getVoteItem(name: OperatorName) {
    return data.value[name] || createVoteItem()
  }

  function updateResult(name: OperatorName, item: Partial<LocalVoteItem>) {
    const opter = data.value[name] || createVoteItem()
    data.value = { ...data.value, [name]: { ...opter, ...item } }
  }

  /**
   * 投票后，更新胜方数据
   */
  function assignWinner(name: OperatorName) {
    const opter = getVoteItem(name)
    updateResult(name, {
      vote_times: opter.vote_times + 1,
      win_times: opter.win_times + 1,
      scores: opter.scores + 1,
      win_rate: Number.parseFloat(((opter.win_times + 1 / (opter.vote_times + 1)) * 100).toFixed(2)),
    })
  }

  /**
   * 投票后，更新败方数据
   */
  function assignLoser(name: OperatorName) {
    const opter = getVoteItem(name)
    updateResult(name, {
      vote_times: opter.vote_times + 1,
      lose_times: opter.lose_times + 1,
      scores: opter.scores - 1,
      win_rate: Number.parseFloat(((opter.win_times / (opter.vote_times + 1)) * 100).toFixed(2)),
    })
  }

  /**
   * 获取本地自己投票的数据
   *
   * 返回类型和接口 `/view_final_order` 的一致
   */
  function getSortedData() {
    const name: OperatorName[] = []
    const rate: number[] = []
    const score: number[] = []

    const entries = Object.entries(data.value)
      .map(([opterName, { win_rate, scores }]) => ({ name: opterName, rate: win_rate, score: scores }))
      .sort((a, b) => b.rate - a.rate)

    entries.forEach((d) => {
      name.push(d.name as OperatorName)
      rate.push(d.rate)
      score.push(d.score)
    })

    return { name, rate, score }
  }

  return {
    data,
    assignWinner,
    assignLoser,
    getSortedData,
  }
}
