<script setup>
import { 
    MovieCard,
} from '@/entities/Movie'
import {
    VButton,
} from '@/shared/ui/VButton'
import {
    ROUTE_NAMES,
} from '@/shared/lib/constants'
import {
    useModal
} from '@/shared/lib/use/useModal'

const modal = useModal()

const props = defineProps({
    movies: {
        type: Array,
        default: () => [],
    },
    title: {
        type: String,
        default: '',
    },
    loading: {
        type: Boolean,
        default: false,
    },
    hidden: {
        type: String,
    },
    empty: {
        type: Boolean,
        default: false,
    },
    backdrop: {
        type: Boolean,
        default: false
    },
})
</script>

<template>
	<div
		v-if="props.movies.length && props.movies" 
		class="infinite-container"
		:class="{ 'disabled-backdrop': props.backdrop }"
	>
		<MovieCard
			v-for="item in props.movies"
			:key="item.id"
			:name-ru="item.nameRu"
			:name-en="item.nameEn"
			:name-original="item.nameOriginal"
			:film-id="item.filmId"
			:imdb-id="item.imdbId"
			:kinopoisk-id="item.kinopoiskId"
			:poster-url-preview="item.posterUrlPreview"
			class="resize"
			@click="modal.close()"
		/>
	</div>

	<div 
		v-if="!props.movies.length && props.empty"
		class="infinite-container__empty"
	>
		<div class="empty-block">
			<div class="empty-block__header">
				Поиск не дал результата
			</div>
			<router-link
				class="empty-block__link" 
				:to="{ name: ROUTE_NAMES.BROWSE }"
			>
				<VButton 
					data-size="large"
					data-appearance="fill"
					class="empty-block__button"
					modificator="color-main"
				>
					Перейти в каталог
				</VButton>
			</router-link>
		</div>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />