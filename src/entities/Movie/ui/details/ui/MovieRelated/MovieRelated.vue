<script setup>
import {
    VWrapper,
} from '@/shared/ui/VWrapper'
import {
    RouletteSlider,
} from '@/shared/ui/RouletteSlider'
import {
    MovieCard,
} from '@/entities/Movie'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'
import {
    VButton,
} from '@/shared/ui/VButton'
import {
    useRoute
} from 'vue-router'

const route = useRoute()

const props = defineProps({
    items: {
        type: Object,
        default: () => {},
    },
    loading: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
	<VWrapper 
		title="Смотреть также"
		class="related"
		:sub-header="false"
	>
		<template #button="slotProps">
			<VButton
				tag="router-link"
				:to="`/movies/${+route.params.id}/similars`"
				data-link="Смотреть все"
				data-size="large"
				modificator="color-main link"
				aria-label="Смотреть все"
				data-appearance="text"
				:class="slotProps.class"
			>
				<UISymbol
					name="arrow-right" 
				/>
			</VButton>
		</template>

		<template #content>
			<RouletteSlider
				class="related__slider content-right" 
				:items="props.items"
				:loading="props.loading"
			>
				<template #slide="{ item }">
					<MovieCard 
						:key="item.filmId"
						:film-id="item.filmId"
						:name-en="item.nameEn"
						:name-ru="item.nameRu"
						:name-original="item.nameOriginal"
						:poster-url-preview="item.posterUrlPreview"
					/>
				</template>
			</RouletteSlider>
		</template>
	</VWrapper>
</template>

<style src="./styles.scss" lang="scss" scoped />