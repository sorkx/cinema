<script setup>
import { 
    Movie,
} from '@/entities/Movie'
import {
    ModuleWrapper,
} from '@/shared/ui/ModuleWrapper'

const props = defineProps({
    items: {
        type: Array,
        default: () => [],
    },
    title: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        default: '',
    }
})
</script>

<template>
	<ModuleWrapper
		:items="props.items"
		:title="props.title"
		icon="arrow-right"
		:link="props.name"
	>
		<template #slide="{ item }">
			<Movie 
				:movie="item"
				:key="item.id"
			/>
		</template>
	</ModuleWrapper>
</template>

<style src="./styles.scss" lang="scss" scoped />