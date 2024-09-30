<script setup>
import {
    UISymbol,
} from '@/shared/ui/UISymbol'
import {
    ROUTE_NAMES,
} from '@/shared/lib/constants'

const props = defineProps({
    person: {
        type: Object,
        required: true,
    },
})
</script>

<template>
	<router-link 
		:to="{
			name: ROUTE_NAMES.STAFF_DETAILS,
			params: {
				id: props.person?.staffId
			}
		}"
	>
		<div class="person">
			<UISymbol
				name="person"
				class="person__image" 
				loading="lazy"
			/>
			<div class="person__overlay">
				<img 
					:src="props.person?.posterUrl" 
					class="person__image"
				/>
				<div class="person__title">
					{{ props.person?.nameEn ||  props.person?.nameRu }}
				</div>
			</div>
		</div>
	</router-link>
</template>

<style src="./styles.scss" lang="scss" scoped />