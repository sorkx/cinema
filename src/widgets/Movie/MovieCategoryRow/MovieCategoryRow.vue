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
    },
    title: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
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