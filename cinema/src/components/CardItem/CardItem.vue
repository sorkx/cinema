<script setup>
import { computed } from 'vue'

	const props = defineProps({
		id: {
			type: String,
			default: '',
		},
		src: {
			type: String,
			default: '',
		},
		name: {
			type: String,
			default: '',
		},
		genre: {
			type: String,
			default: '',
		},
		rating: {
			type: Number,
			default: 0,
		}
	})

	const emit = defineEmits(['cardClick'])

	const handlerClick = () => {
		emit('cardClick', props.id)
	}

	const ratingColorClass = computed(() => {
		if (props.rating >= 7) {
			return 'green'
		} else if (props.rating > 5) {
			return 'yellow'
		} else {
			return 'red'
		}
	})
</script>

<template>
	<div class="card-item" @click="handlerClick">
		<div class="card-content">
			<div class="card-background">
				<img 
					:src="props.src"
					class="card-img" 
					loading="lazy"
				/>
				<div class="card-background__darkened" />
			</div>
			<div class="card-info">
				<div class="card-name">
					{{ props.name }}
				</div>
				<div class="card-genre">
					{{ props.genre }}
				</div>
				<div :class="['card-rating', ratingColorClass]">
					{{ props.rating }}
				</div>
			</div>
		</div>
	</div>
</template>

<style src="./cardItem.scss" lang="scss" scoped />