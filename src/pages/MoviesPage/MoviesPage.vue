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
    MovieLists,
} from '@/widgets/Movie'
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
    useInfinityScroll
} from '@/shared/lib/use/useInfinityScroll'
import {
    MovieFilter,
} from '@/features/Movies'
import {
    VWrapper,
} from '@/shared/ui/VWrapper'
import {
    VButton,
} from '@/shared/ui/VButton'
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

    await store.fetchCategoryNextPage(contentType.value, filterParams.value)
    currentResults.value = state.value.categories[contentType.value]?.data
}

const fetchCategoryItems = async () => {
    isLoading.value = true

    currentResults.value = []
    await store.fetchCategoryData(contentType.value, 1, filterParams.value)
    currentResults.value = state.value.categories[contentType.value]?.data

    isLoading.value = false
}

const { scrollComponent, isLoading: isLoadingMore } = useInfinityScroll({
    fetchData: fetchCategoryItems,
    fetchNextPage: loadMore,
})

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

const debouncedFetch = debounce(fetchCategoryItems, 500)

watch(filterParams, () => debouncedFetch(), { deep: true })

onMounted(async () => await getMovieFilters())
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

			<MovieLists
				:movies="currentResults"
				hidden="true"
				:empty="currentResults.length === 0"
				:loading="isLoadingMore || isLoading"
			>
				<template #button>
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
			</MovieLists>

			<div ref="scrollComponent" />
		</template>
	</VWrapper>
</template>