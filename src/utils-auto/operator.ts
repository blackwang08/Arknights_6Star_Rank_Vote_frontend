import operatorsOrigin from './data/operators.json'

type OperatorName = keyof typeof operatorsOrigin

export interface Operator<T extends OperatorName = OperatorName> {
  name: T
  id: number
  avatar: string
}

const { operators, idToNameCache } = loadCache()

/**
 * 获取所有干员数据
 */
export function getOperators() {
  return operators
}

const total = Object.keys(operators).length

/**
 * 获取干员总数
 */
export function getOperatorsTotal() {
  return total
}

function getIdKey(id: number) {
  return `id${id}`
}

function loadCache() {
  const operators = new Map<string, Operator>()
  const idToName = new Map<string, string>()

  Object.entries(operatorsOrigin as Record<OperatorName, Omit<Operator, 'name'>>).forEach(([k, v]) => {
    operators.set(k, { ...v, name: k as OperatorName })
    idToName.set(getIdKey(v.id), k)
  })

  return {
    operators: readonly(operators),
    idToNameCache: readonly(idToName),
  }
}

/**
 * 根据参数获取存在的干员名
 */
export function ensureOperatorName(nameOrId: any) {
  if (!nameOrId)
    return undefined

  if (typeof nameOrId === 'number')
    return idToNameCache.get(getIdKey(nameOrId))

  return operators.has(nameOrId as OperatorName) ? nameOrId as OperatorName : undefined
}

/**
 * 根据 name 或 id 判断干员是否存在
 */
export function exisitsOperator(nameOrId: string | number) {
  const name = ensureOperatorName(nameOrId)
  return name && operators.has(name)
}

/**
 * 根据 name 或 id 获取干员
 */
export const getOperator = findOperator

/**
 * 根据 name 或 id 获取干员
 */
export function findOperator(nameOrId: string | number) {
  const name = ensureOperatorName(nameOrId)
  return name && operators.get(name)
}

/**
 * 检查数据是否有效
 */
export function isValidOperator(data: any, ignore: Array<'name' | 'id' | 'avatar'> = []): data is Operator {
  const validKeys = (['name', 'id', 'avatar'] as const).filter(k => !ignore.includes(k))
  return validKeys.every(k => data[k])
}
