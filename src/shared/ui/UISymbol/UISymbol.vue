<script setup>
import {
    computedAsync,
} from '@vueuse/core'

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    fill: {
        type: String,
        default: 'currentColor',
    }
})

const iconId = computedAsync(async () => {
    if (!props.name) return ''

    try {
        const icon = await import(`@/shared/assets/icons/${props.name}.svg`)
        
        return icon.default || icon.url || ''
    } catch (e) {
        console.error(`Failed to load icon: ${props.name}`, e)
        return ''
    }
}, '')
</script>

<template>
	<svg
		class="icon"
		:fill="props.fill"
		xmlns="http://www.w3.org/2000/svg"
	>
		<use :xlink:href="`#${iconId}`" />
	</svg>
</template>

<style src="./styles.scss" lang="scss" scoped />