<script setup>
import {
    UISymbol,
} from '@/shared/ui/UISymbol'

const props = defineProps({
    name: {
        type: String,
        default: ''
    },
    rating: {
        type: [String, Number],
        default: '',
    },
    size: {
        type: [String, Number],
        default: 'normal' | 'small',
    },
})

const addedZeroRating = (rating) => Number.isInteger(rating) ? `${rating}.0` : rating
</script>

<template>
	<div 
		class="movie-rating" 
		:class="`movie-rating--${name}`" 
		:data-size="size"
	>
		<UISymbol v-if="props.name" :name="props.name" />
		{{ addedZeroRating(props.rating) || '0.0' }}
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />