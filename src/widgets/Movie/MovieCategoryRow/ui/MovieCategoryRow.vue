<script setup>
import { 
    MovieCard,
} from '@/entities/Movie'
import {
    VWrapper,
} from '@/shared/ui/VWrapper'
import {
    RouletteSlider,
} from '@/shared/ui/RouletteSlider'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'
import {
    VButton,
} from '@/shared/ui/VButton'

const props = defineProps({
    items: {
        type: Array,
        default: () => [],
    },
    title: {
        type: String,
        default: '',
    },
    to: {
        type: String,
        default: '',
    },
    loading: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
	<VWrapper
		:title="props.title"
	>
		<template #button="slotProps">
			<VButton
				:class="slotProps.class"
				:to="to"
				tag="router-link"
				data-link="Смотреть все"
				data-size="large"
				modificator="color-main link"
				aria-label="Смотреть все"
				data-appearance="text"
			>
				<UISymbol
					name="arrow-right" 
				/>
			</VButton>
		</template>

		<template #content>
			<RouletteSlider 
				:items="props.items"
				class="content-right slider"
				:loading="props.loading"
			>
				<template #slide="{ item }">
					<MovieCard 
						:key="item.id"
						:name-ru="item.nameRu"
						:name-en="item.nameEn"
						:name-original="item.nameOriginal"
						:film-id="item.filmId"
						:imdb-id="item.imdbId"
						:kinopoisk-id="item.kinopoiskId"
						:rating-kinopoisk="item.ratingKinopoisk"
						:ratingImdb="item.ratingImdb"
						:poster-url-preview="item.posterUrlPreview"
					/>
				</template>
			</RouletteSlider>
		</template>
	</VWrapper>
</template>

<style src="./styles.scss" lang="scss" scoped />