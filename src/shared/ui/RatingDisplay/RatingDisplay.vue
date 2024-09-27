<script setup>
import { 
    defineProps,
    computed,
} from 'vue'
import { 
    UISymbol,
} from '@/shared/ui/UISymbol'

const props = defineProps({
    rating: {
        type: Number,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    size: {
        type: String,
        default: '',
    }
})

const addedZeroRating = computed(() => {
    return Number.isInteger(props.rating) ? `${props.rating}.0` : props.rating.toFixed(1)
})
</script>

<template>
	<div 
		:class="`external__rating--${props.size}`"
		class="external__rating"
	>
		<UISymbol 
			:name="props.source"
			class="external__rating--icon"
		/>
		<div class="external__rating--value">
			{{ addedZeroRating }}
		</div>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />