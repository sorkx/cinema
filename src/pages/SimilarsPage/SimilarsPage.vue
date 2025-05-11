<script setup>
import { 
    ref,
    computed,
    onBeforeMount,
} from 'vue'
import {
    storeToRefs,
} from 'pinia'
import { 
    movieModel,
} from '@/entities/Movie'
import { 
    useRoute 
} from 'vue-router'
import {
    VWrapper,
} from '@/shared/ui/VWrapper'
import {
    VInfiniteScroll
} from '@/shared/ui/VInfiniteScroll'
import { 
    MovieCard,
} from '@/entities/Movie'

const route = useRoute()

const store = movieModel()

const isLoading = ref(true)

const { 
    similars,
} = storeToRefs(store)

const movieId = computed(() => +route.params.filmId)

const fetchData = async () => {
    isLoading.value = true

    await store.fetchMovieSimilars(movieId.value)

    isLoading.value = false
}

onBeforeMount(async () => await fetchData())
</script>

<template>
	<VWrapper 
		title="Смотреть также"
		:sub-header="true"
		class="offset sub-header"
	>
		<template #content>
			<VInfiniteScroll 
				:pending="isLoading" 
				:items="similars ?? []" 
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