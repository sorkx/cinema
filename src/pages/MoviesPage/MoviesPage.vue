<script setup>
import {
    computed,
    ref,
    watch,
    onMounted,
} from 'vue'
import { 
    useRoute,
} from 'vue-router'
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
    MovieFilter,
} from '@/features/Movies'
import {
    VWrapper,
} from '@/shared/ui/VWrapper'
import {
    VButton,
} from '@/shared/ui/VButton'
import {
    VInfiniteScroll
} from '@/shared/ui/VInfiniteScroll'
import { 
    MovieCard,
} from '@/entities/Movie'
import debounce from 'lodash.debounce'

const route = useRoute()
const store = movieModel()

const childElement = ref(null)
const currentResults = ref([])
const isLoading = ref(true)
const isLoadingFilters = ref(false)

const { 
    state,
    genresMovie,
    countriesMovie,
} = storeToRefs(store)

const formattedTitle = {
    TV_SERIES: 'Сериалы',
    FILM: 'Фильмы',
}

const routeMapping = {
    films: CINEMA_NAMES.FILM,
    serials: CINEMA_NAMES.TV_SERIES,
}

const contentType = computed(() => routeMapping[movieType.value])
const movieId = computed(() => +route.params.id)
const movieType = computed(() => route.params.type)

const filterParams = ref({
    genres: movieId.value || '',
    countries: '',
    ratingFrom: '',
    ratingTo: '',
    yearTo: '',
    yearFrom: '',
    order: ''
})

const loadMore = async () => {
    if (isLoading.value) return

    if (!isLoading.value) {
        try {
            isLoading.value = true
            await store.fetchCategoryNextPage(contentType.value, filterParams.value)
            currentResults.value = state.value.categories[contentType.value]?.data
        } catch (error) {
            console.error('Error loading more items:', error)
        } finally {
            isLoading.value = false
        }
    }
}

const fetchCategoryItems = async () => {
    isLoading.value = true

    currentResults.value = []
    await store.fetchCategoryData(contentType.value, 1, filterParams.value)
    currentResults.value = state.value.categories[contentType.value]?.data

    isLoading.value = false
}
 
const resetFilters = () => childElement.value.resetFilters()

const getMovieFilters = async () => {
    isLoadingFilters.value = true

    await store.fetchMovieFilters()

    isLoadingFilters.value = false
}

const genres = computed(() => {
    return genresMovie.value.map((item) => {
        const char = item.genre.charAt(0)
        return {
            ...item,
            genre: char.toUpperCase() + item.genre.slice(1)
        }
    })
})

const currentGenre = computed(() => genres.value.find(g => g.id === movieId.value)?.genre || formattedTitle[contentType.value])

const debouncedFetch = debounce(fetchCategoryItems, 200)

watch(filterParams, () => debouncedFetch(), { deep: true })

onMounted(async () => {
    await getMovieFilters()
    await fetchCategoryItems()
})
</script>

<template>
	<VWrapper
		:title="currentGenre"
		:sub-header="true"
		class="offset"
	>
		<template #content>
			<MovieFilter
				ref="childElement" 
				:genres="genres"
				:countries="countriesMovie"
				:is-loading-filters="isLoadingFilters"
				v-model:selected-country="filterParams.countries"
				v-model:selected-genre="filterParams.genres"
				v-model:order="filterParams.order"
				v-model:year-from="filterParams.yearFrom"
				v-model:year-to="filterParams.yearTo"
				v-model:rating-from="filterParams.ratingFrom"
				v-model:rating-to="filterParams.ratingTo"
			/>

			<VInfiniteScroll 
				:pending="isLoading" 
				:items="currentResults ?? []" 
				empty="cheels"
				@loadNext="loadMore"
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
						:rating-imdb="item.ratingImdb"
						:rating-kinopoisk="item.ratingKinopoisk"
						class="resize"
						@click="modal.close()"
					/>
				</template>
				<template #empty-button>
					<VButton
						data-size="large"
						data-appearance="fill"
						class="empty-block__button"
						modificator="color-main"
						@click="resetFilters"
					>
						Сбросить фильтры
					</VButton>
				</template>
			</VInfiniteScroll>
		</template>
	</VWrapper>
</template>