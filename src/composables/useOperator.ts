/**
 * Get data of operator by name or id
 *
 * @example
 *
 * ```js
 * // Basic
 * const { update, operator } = useOperator()
 * console.log(operator)                  // { name: undefined, id: undefined, avatar: undefined }
 *
 * // use name
 * update("荒芜拉普兰德")                 // { name: "荒芜拉普兰德", ... }
 *
 * // use id
 * update(4026)                           // { name: "忍冬", ... }
 *
 * // Initial data
 * const { update, operator } = useOperator("荒芜拉普兰德")
 * console.log(operator)                  // { name: "荒芜拉普兰德", ... }
 * ```
 */
export function useOperator(target?: string | number) {
  const nameRef = ref(ensureOperatorName(target))

  const operator = reactive<Partial<Operator>>({})

  function update(name?: string) {
    const data = name ? getOperator(name) || {} : {} as Partial<Operator>
    operator.name = data.name
    operator.id = data.id
    operator.avatar = data.avatar
  }

  watch(nameRef, update)

  return {
    update: (target?: number | string) => (nameRef.value = ensureOperatorName(target)),
    operator: readonly(operator),
  }
}
