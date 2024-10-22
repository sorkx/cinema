<script setup>
import {
    computed,
} from 'vue'
import {
    starsSystem,
} from './model'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'

const props = defineProps({
    rating: {
        type: Number,
        required: true,
        validator: (value) => value >= 0 && value <= starsSystem
    },
})

const ratingWidth = computed(() => {
    return props.rating / starsSystem * 100
})

const ratingWidthStyle = computed(() => {
    return `width: ${ratingWidth.value}%`
})
</script>

<template>
	<div class="vote-rating">
		<div class="star-rating">
			<div
				class="vote-rating__item" 
				v-for="index in starsSystem" :key="index"
			>
				<UISymbol 
					name="star"
					class="star star--outlined" 
				/>
				<span class="vote-rating__label">
					{{ index }}
				</span>
			</div>
			<div class="star-rating__colored" :style="ratingWidthStyle">
				<div v-for="index in starsSystem" :key="index">
					<UISymbol 
						name="star"
						class="star star--colored" 
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />