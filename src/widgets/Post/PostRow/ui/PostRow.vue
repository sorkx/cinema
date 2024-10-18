<script setup>
import { 
    Post,
} from '@/entities/MediaPost'
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
		swiper-type="media"
	>
		<template #slide="{ item }">
			<Post 
				:post="item"
				:key="item.kinopoiskId"
			/>
		</template>
	</ModuleWrapper>
</template>