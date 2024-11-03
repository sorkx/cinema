<script setup>
import {
    VWrapper,
} from '@/shared/ui/VWrapper'
import {
    RouletteSlider,
} from '@/shared/ui/RouletteSlider'
import {
    SeriesCard
} from '../MovieSeries/ui/SeriesCard'
import {
    TrailersModal,
} from '../MovieTrailers/ui/TrailersModal'
import {
    useWindowWidth,
} from '@/shared/lib/use/useWindowWidth'
import {
    provideModal
} from '@/shared/lib/use/useModal'

const { 
    closeModal, 
    isOpen, 
    openModal 
} = provideModal()

const windowWidth = useWindowWidth()

const props = defineProps({
    items: {
        type: Array,
        default: () => []
    }
})

const getYoutubeThumbnail = (url, quality = 'high') => {
    if (!url) return false

    let videoId
    
    const youtubeRegex = /youtube\.com.*(\?v=|\/embed\/)(.{11})/
    const youtubeShortRegex = /youtu.be\/(.{11})/
    
    const youtubeMatch = url.match(youtubeRegex)
    const shortMatch = url.match(youtubeShortRegex)
    
    if (youtubeMatch) {
        videoId = youtubeMatch[2]
    } else if (shortMatch) {
        videoId = shortMatch[1]
    }

    if (!videoId) return false

    const qualityMap = {
        low: 'sddefault',
        medium: 'mqdefault',
        high: 'hqdefault',
        max: 'maxresdefault'
    }

    const qualityKey = qualityMap[quality] || qualityMap.high
    
    return `https://img.youtube.com/vi/${videoId}/${qualityKey}.jpg`
}
</script>

<template>
	<section
		v-if="windowWidth < 640" 
		class="wrapper movie-trailers full-width"
	>
		<VWrapper
			title="Трейлеры"
			:sub-header="false"
		>
			<template #content>
				<RouletteSlider :items="props.items">
					<template #slide="{ item }">
						<SeriesCard
							appearance="series" 
							:item="item"
							:img="getYoutubeThumbnail(item.url, 'medium')"
							@click="openModal"
						/>
					</template>
				</RouletteSlider>
			</template>
		</VWrapper>
	</section>
	<TrailersModal
		v-if="isOpen"
		@close="closeModal" 
		:seasons="props.items"
	/>
</template>

<style  src="./styles.scss" lang="scss" scoped />