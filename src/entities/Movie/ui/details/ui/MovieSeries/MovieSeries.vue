<script setup>
import {
    computed,
    ref,
    onMounted,
} from 'vue'
import {
    RouletteSlider,
} from '@/shared/ui/RouletteSlider'
import {
    SeriesCard,
} from './ui/SeriesCard'

const props = defineProps({
    items: {
        type: Object,
        default: () => {},
    },
    type: {
        type: String,
        default: '',
    },
    loading: {
        type: Boolean,
        default: false
    }
})

const selectedSeason = ref(null)

const currentSeason = computed(() => props.items.find(season => season.number === selectedSeason.value))

onMounted(() => {
    if (props.items.length > 0) {
        selectedSeason.value = props.items[0].number
    }
})
</script>

<template>
	<section class="wrapper movie-series full-width">
		<div class="movie-series__wrapper content-right">
			<div class="movie-series__header">
				<h2 class="movie-series__title">
					Сезоны
				</h2>
				<div
					class="movie-series__seasons"
				>
					<RouletteSlider
						v-if="!props.loading"
						:items="props.items"
						:loading="props.loading"
					>
						<template #slide="{ item }">
							<div 
								:key="item.number"
								class="movie-series__season-button"
								@click="selectedSeason = item.number"
								:class="{ active: selectedSeason === item.number }"
							>
								{{ item.number }}
							</div>
						</template>
					</RouletteSlider>
				</div>
			</div>
			<div 
				v-if="currentSeason"
				class="movie-series__slider"
			>
				<RouletteSlider 
					:items="currentSeason.episodes"
					appearance="series"
					:loading="props.loading"
				>
					<template #slide="{ item }">
						<SeriesCard
							appearance="series" 
							:item="item" 
						/>
					</template>
				</RouletteSlider>
			</div>
		</div>
	</section>
</template>

<style src="./styles.scss" lang="scss" scoped />