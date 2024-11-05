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
    },
    loading: {
        type: Boolean,
        default: false
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
	<template v-if="!props.loading">
		<VWrapper
			v-if="windowWidth < 640" 
			title="Трейлеры"
			:sub-header="true"
			class="movie-trailers"
		>
			<template #content>
				<RouletteSlider 
					:items="props.items"
					class="content-right movie-series__wrapper"
				>
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
		<TrailersModal
			v-if="isOpen"
			@close="closeModal" 
			:seasons="props.items"
		/>
	</template>
</template>

<style  src="./styles.scss" lang="scss" scoped />