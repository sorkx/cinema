<script setup>
import { 
    useImageLoader,
} from '@/shared/lib/use/useImageLoader'
import {
    VLoader,
} from '@/shared/ui/VLoader'

const props = defineProps({
    nameRu: {
        type: String,
        default: '',
    },
    nameEn: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        default: '',
    },
    episodeNumber: {
        type: [String, Number],
        default: '',
    },
    seasonNumber: {
        type: [String, Number],
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
				<VLoader 
					v-else
					:logo-loader="true"
					modificator="series"
					data-size="middle"
					data-media="small"
				/>
			</span>
			<span v-else>
				Постер не найден
			</span>
		</div>
		<div class="series-card__namespace">
			<div class="series-card__title">
				{{ props.nameRu || props.nameEn || props.name }}
			</div>
			<span
				v-if="props.seasonNumber && props.episodeNumber" 
				class="series-card__info"
			>
				{{ props.seasonNumber }} сезон, {{ props.episodeNumber}} серия
			</span>
		</div>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />