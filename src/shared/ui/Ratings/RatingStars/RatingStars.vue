<script setup>
import {
    starsSystem,
} from './model'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'

const props = defineProps({
    rating: {
        type: Number,
        required: true
    },
})
</script>

<template>
	<div class="stars">
		<div 
			v-for="item in starsSystem"
			:key="item"
			class="stars__item"
		>
			<UISymbol
				name="star"
				:class="item <= props.rating ? 'active' : 'inactive'" 
				:fill="item <= props.rating ? 'currentColor' : 'none'"  
			/>
		</div>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />