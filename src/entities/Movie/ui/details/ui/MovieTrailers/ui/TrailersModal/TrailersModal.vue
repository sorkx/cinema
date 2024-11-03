<script setup>
import {
    ref,
} from 'vue'
import {
    VModal,
} from '@/shared/ui/VModal'
import {
    VButton,
} from '@/shared/ui/VButton'

const props = defineProps({
    seasons: {
        type: Array,
        default: () => []
    }
})

const currentSeason = ref(props.seasons[0] || null)

const changeSeason = (season) => {
    currentSeason.value = season
}

const emit = defineEmits(['close'])

const closeModal = () => {
    emit('close')
}

const getPlayerUrl = () => {
    if (!currentSeason.value) return ''

    const videoId = currentSeason.value.url
        .match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w\-]{10,12})\b/)[1]

    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`
}
</script>

<template>
	<VModal
		:header="false"
		size="extra"
		@close="closeModal"
	>
		<template #content>
			<div
				v-if="props.seasons.length > 0" 
				class="trailers-modal"
			>
				<p class="trailers-modal__header">
					Трейлеры
				</p>
				<div class="trailers-modal__seasons">
					<VButton
						v-for="season in props.seasons"
						:key="season.name"
						size="small"
						appearance="fill"
						:modificator="currentSeason === season ? 'color-main' : 'color-gray'"
						@click="changeSeason(season)"
					>
						{{ season.name }}
					</VButton>
				</div>
				<div class="trailers-modal__player">
					<div class="video-wrapper">
						<iframe 
							:src="getPlayerUrl()"
							frameborder="0"
							allowfullscreen 
						/>
					</div>
				</div>
			</div>
			<div 
				v-else
				class="trailers-modal__not-found"
			>
				Трейлеров не обнаружено
			</div>
		</template>
	</VModal>
</template>

<style src="./styles.scss" lang="scss" scoped />