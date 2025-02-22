<script setup lang=ts>
const { width: screenWidth, height: screenHeight } = useWindowSize()
const { x, y } = usePointer()

const el = useTemplateRef('el')
const { width, height } = useElementSize(el)

const style = shallowRef({})

const update = useThrottleFn(() => {
  if (!el.value)
    return

  const left = x.value + width.value + 21 > screenWidth.value ? x.value - width.value - 21 : x.value
  const top = y.value + height.value + 21 > screenHeight.value ? y.value - height.value - 21 : y.value

  style.value = {
    left: `${left}px`,
    top: `${top}px`,
  }
}, 60)

watch([width, height, x, y], update)
</script>

<template>
  <img
    ref="el"
    class="mouse-follower"
    src="../assets/images/夕trans.gif"
    :style="style"
  >
</template>

<style scoped>
.mouse-follower {
    position: fixed;
    z-index: 99999;
    width: 100px;
    vertical-align: middle;
    transition: left 0.3s ease, top 0.3s ease;
    user-select: none;
    pointer-events: none;
}
</style>
