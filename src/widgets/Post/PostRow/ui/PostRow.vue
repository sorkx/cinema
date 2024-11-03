<script setup>
import { 
    Post,
} from '@/entities/MediaPost'
import {
    VWrapper,
} from '@/shared/ui/VWrapper'

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
	<VWrapper
		:items="props.items"
		:title="props.title"
		icon="arrow-right"
		:link="props.name"
	>
		<template #slide="{ item }">
			<Post 
				:post="item"
				:key="item.kinopoiskId"
			/>
		</template>
	</VWrapper>
</template>