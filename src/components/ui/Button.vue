<script setup lang='ts'>
const props = defineProps<{
  isLoading?: boolean
  disabled?: boolean
}>()

const emit = defineEmits(['click'])

function handleClick() {
  if (props.isLoading || props.disabled)
    return

  emit('click')
}
</script>

<template>
  <button
    class="button" :disabled="props.disabled ?? false"
    :class="{
      loading: props.isLoading,
      disabled: props.disabled,
    }" @click="handleClick"
  >
    <slot />
  </button>
</template>

<style scoped>
.button{
    display: inline-block;
    cursor: pointer;
    /* box-shadow: var(--shadow-1); */
    padding: .5em 1em;
    border-radius: 3px;
    background-color: var(--c-text-3);
    color: var(--c-bg-soft);
    transition: all .2s ease;
    position: relative;
    border: 1px solid var(--c-text-3);
}

.button:hover {
    background-color: var(--c-bg-soft);
    color: var(--c-text-3);
}

.button::before {
    display: inline-block;
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
}

.loading{
    cursor: wait;
    opacity: .5;
}

.disabled {
    cursor: not-allowed;
    opacity: .5;
}

.loading:hover,
.disabled:hover {
    background-color: var(--c-text-3);
    color: var(--c-bg-soft);
}
</style>
