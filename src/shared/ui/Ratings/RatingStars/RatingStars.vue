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
	<div class="star-rating">
		<span v-for="index in starsSystem" :key="index">
			<UISymbol 
				name="star"
				class="star star--outlined" 
			/>
		</span>
		<div class="star-rating__colored" :style="ratingWidthStyle">
			<span v-for="index in starsSystem" :key="index">
				<UISymbol 
					name="star"
					class="star star--colored" 
				/>
			</span>
		</div>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />