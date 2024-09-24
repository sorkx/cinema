<script setup>
import { 
    computed, 
} from 'vue'

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
    },
})

const modules = import.meta.glob('/src/assets/icons/*.svg', { eager: true })

const iconId = computed(() => {
    if (!props.name) return ''

    const path = `/src/assets/icons/${props.name}.svg`

    if (modules[path]) {
        console.log('Module found:', modules[path])
        console.log('Default value:', modules[path].default)
        return modules[path]?.default
    } else {
        console.log('Module not found for path:', path)
        return ''
    }
})
</script>

<template>
	<svg
		class="icon"
		xmlns="http://www.w3.org/2000/svg"
	>
		<use :xlink:href="`#${iconId}`" />
	</svg>
	<span v-if="props.value">
		{{ props.value }}
	</span> 
</template>

<style src="./UIsymbol.scss" lang="scss" scoped />