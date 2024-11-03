<script setup>
import { 
    useImageLoader,
} from '@/shared/lib/use/useImageLoader'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'

const props = defineProps({
    src: {
        type: String,
        default: '',
    },
    alt: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        default: '',
    }
})

const { 
    imageLoaded, 
    imageSrc, 
    isLoading, 
    imageRef,
} = useImageLoader(props.src)
</script>

<template>
	<span ref="imageRef">
		<img
			v-if="!isLoading && imageLoaded" 
			:src="imageSrc"
			:alt="props.alt"
			loading="eager"
			transition="fade"
			transitionall="true"
		/>
		<UISymbol
			v-else 
			:name="props.name"
		/>
	</span>
</template>

<style src="./styles.scss" lang="scss" scoped />