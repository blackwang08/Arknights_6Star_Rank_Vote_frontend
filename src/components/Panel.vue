<script setup lang="ts">
defineProps<{
    transition?: 'clip' | 'slide'
}>()

const emit = defineEmits(['close'])
const visible = defineModel()
function close() {
    emit('close')
    visible.value = false
}

defineOptions({
    inheritAttrs: false
})
</script>

<template>
    <Transition :name="transition || 'slide'">
        <div v-show="visible" class="wrapper" @click.self="close">
            <ShadowCard class="container" v-bind="$attrs">
                <slot name="header" />
                <slot />
                <div class="footer">
                    <slot name="footer" />
                    <Button @click="close">
                        关闭
                    </Button>
                </div>
            </ShadowCard>
        </div>
    </Transition>
</template>

<style scoped>
.wrapper {
    position: fixed;
    z-index: 999;
    inset: 0;
    width: 100%;
    height: 100%;
    display: flex;
}

.container {
    margin: auto;
    overflow: auto;
}

.footer {
    display: flex;
    justify-content: end;
    align-items: center;
    margin-top: 20px;
}

.footer .close {
    display: block;
    cursor: pointer;
    box-shadow: var(--shadow-1);
    padding: .5em 1em;
    border-radius: 3px;
    background-color: var(--c-text-3);
    color: var(--c-bg-soft);
    transition: all .2s ease;
}

.footer .close:hover {
    background-color: var(--c-bg-soft);
    color: var(--c-text-3);
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.4s ease, opacity 0.4s ease;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
    opacity: 0;
}

.clip-enter-active {
    animation: clip 0.5s;
}

.clip-leave-active {
    animation: clip 0.5s reverse;
}

@keyframes clip {
    0% {
        clip-path: circle(0 at 100% 100%);
    }

    100% {
        clip-path: circle(120% at 100% 100%);
    }
}
</style>
