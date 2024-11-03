<script setup>
import { 
    useImageLoader,
} from '@/shared/lib/use/useImageLoader'

const props = defineProps({
    item: {
        type: Object,
    },
    appearance: {
        type: String,
        default: '',
    },
    img: {
        type: [Boolean, String],
        default: '',
    }
})

const { 
    imageLoaded, 
    imageSrc, 
    isLoading, 
    imageRef
} = useImageLoader(props.img)
</script>

<template>
	<div 
		class="series-card"
		:data-appearance="props.appearance"
	>
		<div class="series-card__body">
			<div class="series-card__overlay" />
			<span
				ref="imageRef" 
				v-if="props.img.length > 0"
			>
				<img
					v-if="!isLoading && imageLoaded" 
					:src="imageSrc"
					loading="eager"
					transition="fade"
					transitionall="false"
					class="series-card__image" 
				/>
			</span>
			<span v-else>
				Постер не найден
			</span>
		</div>
		<div class="series-card__namespace">
			<div class="series-card__title">
				{{ props.item.nameRu || props.item.nameEn || props.item.name }}
			</div>
			<span
				v-if="props.item.seasonNumber && props.item.episodeNumber" 
				class="series-card__info"
			>
				{{ props.item.seasonNumber }} сезон, {{ props.item.episodeNumber}} серия
			</span>
		</div>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />