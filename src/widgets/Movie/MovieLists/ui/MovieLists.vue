<script setup>
import { 
    MovieCard,
} from '@/entities/Movie'
import {
    useModal
} from '@/shared/lib/use/useModal'
import {
    CircleLoader,
} from '@/shared/ui/loaders'
import {
    VEmptyBlock,
} from '@/shared/ui/VEmptyBlock'

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
    loading: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
	<div
		v-show="props.movies && !props.loading"
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
	
	<CircleLoader v-if="props.loading" />

	<div 
		v-if="props.empty && !props.loading"
		class="infinite-container__empty"
	>
		<VEmptyBlock 
			title="Поиск не дал результата"
			@click="modal.close()"
		/>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />