<script setup>
import {
    UISymbol,
} from '@/shared/ui/UISymbol'

const props = defineProps({
    item: {
        type: Object,
    },
})
</script>

<template>
	<div class="episodes__body">
		<UISymbol 
			name="vertical"
			class="episodes__image" 
		/>
		<div class="episodes__overlay">
			<div class="episodes__block">
				Постер не найден
			</div>
			<div class="episodes__content" />
		</div>
	</div>
	<div class="episodes__title">
		{{ props.item.nameRu || props.item.nameEn }}
	</div>
	<div class="episodes__info">
		<div class="episodes__info-text">
			{{ props.item.seasonNumber }} сезон, {{ props.item.episodeNumber}} серия
		</div>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />