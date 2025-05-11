<script setup>
import { 
    onMounted,
    ref,
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
    VWrapper,
} from '@/shared/ui/VWrapper'
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

const fetchDataPopularItems = async () => {
    isLoading.value = true

    await store.fetchCollectionData(CINEMA_NAMES.TOP_POPULAR_ALL, 1)

    isLoading.value = false
}

const fetchNextPage = async () => {
    if (isLoading.value) return

    if (!isLoading.value) {
        try {
            isLoading.value = true
            await store.fetchCollectionNextPage(CINEMA_NAMES.TOP_POPULAR_ALL)
        } catch (error) {
            console.error('Error loading more items:', error)
        } finally {
            isLoading.value = false
        }
    }
}

onMounted(async () => await fetchDataPopularItems())
</script>

<template>
	<VWrapper
		title="Популярные фильмы и сериалы"
		:sub-header="true"
		class="offset"
	>
		<template #content>
			<VInfiniteScroll 
				:pending="isLoading" 
				:items="state?.collections?.TOP_POPULAR_ALL?.data ?? []" 
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
		</template>
	</VWrapper>
</template>