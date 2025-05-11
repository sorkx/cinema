<script setup>
import {
    ref,
    onMounted
} from 'vue'
import {
    storeToRefs,
} from 'pinia'
import { 
    movieModel,
} from '@/entities/Movie'
import {
    CINEMA_NAMES,
} from '@/shared/lib/constants'
import {
    VInfiniteScroll
} from '@/shared/ui/VInfiniteScroll'
import { 
    MovieCard,
} from '@/entities/Movie'

const store = movieModel()

const isLoading = ref(true)

const { 
    state,
} = storeToRefs(store)

const fetchDataSerialItems = async () => {
    isLoading.value = true

    await store.fetchCollectionData(CINEMA_NAMES.TOP_250_TV_SHOWS, 1)

    isLoading.value = false
}

const fetchNextPage = async () => {
    if (isLoading.value) return

		    if (!isLoading.value) {
        try {
            isLoading.value = true
            await store.fetchCollectionNextPage(CINEMA_NAMES.TOP_250_TV_SHOWS)
        } catch (error) {
            console.error('Error loading more items:', error)
        } finally {
            isLoading.value = false
        }
    }
}

onMounted(async () => await fetchDataSerialItems())
</script>

<template>
	<div class="wrapper offset">
		<div class="wrapper-header">
			<div class="wrapper-title">
				Топ 250 сериалов
			</div>
		</div>
		<div class="wrapper-subheader" />

		<VInfiniteScroll 
			:pending="isLoading" 
			:items="state.collections.TOP_250_TV_SHOWS?.data.length ?? []" 
			@loadNext="fetchNextPage"
		>
			<template #default="{ item }">
				<MovieCard
					:name-ru="item.nameRu"
					:name-en="item.nameEn"
					:name-original="item.nameOriginal"
					:film-id="item.filmId"
					:imdb-id="item.imdbId"
					:kinopoisk-id="item.kinopoiskId"
					:poster-url-preview="item.posterUrlPreview"
					:rating-kinopoisk="item.ratingKinopoisk"
					:rating-imdb="item.ratingImdb"
					class="resize"
					@click="modal.close()"
				/>
			</template>
		</VInfiniteScroll>
	</div>
</template>