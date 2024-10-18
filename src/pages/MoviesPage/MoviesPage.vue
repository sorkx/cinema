<script setup>
import {
    computed,
    onMounted,
    ref,
    reactive,
    watch,
} from 'vue'
import { 
    useRoute,
} from 'vue-router'
import {
    MovieLists,
} from '@/widgets/Movie'
import {
    Pathway,
} from '@/shared/ui/Pathway'
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
    SpinnerLoader,
} from '@/shared/ui/loaders'
import {
    MovieFilter,
} from '@/features/Movies'
import debounce from 'lodash.debounce'

const route = useRoute()
const store = movieModel()

const currentResults = ref([])

const { 
    state,
    genresMovie,
    isLoading,
} = storeToRefs(store)

const formattedTitle = {
    TV_SERIES: 'Сериалы',
    FILM: 'Фильмы',
}

const routeMapping = {
    films: CINEMA_NAMES.FILM,
    serials: CINEMA_NAMES.TV_SERIES,
}

const contentType = computed(() => routeMapping[route.params.type])

const filterParams = reactive({
    genres: '',
    ratingFrom: '',
    ratingTo: '',
    yearTo: '',
    yearFrom: '',
    order: ''
})

const fetchMovies = async (page = 1) => {
    await store.fetchCategoryData(contentType.value, page, filterParams)
}

const loadMore = async () => {
    await store.fetchCategoryNextPage(contentType.value, filterParams)
    currentResults.value = state.value.categories[contentType.value].data
}

const fetchCategoryItems = async () => {
    currentResults.value = []
    await fetchMovies(1)
    currentResults.value = state.value.categories[contentType.value]?.data
}

const fetchNextPage = async () => await loadMore()

const updateFilterParam = debounce((param, value) => {
    filterParams[param] = value
    fetchCategoryItems()
}, 500)

const { scrollComponent } = useInfinityScroll({
    fetchData: fetchCategoryItems,
    fetchNextPage: fetchNextPage,
})

watch(() => route.params.type, fetchCategoryItems)

onMounted(async () => await store.fetchMovieFilters())
</script>

<template>
	<div class="container">
		<Pathway
			:title="formattedTitle[contentType]"
		/>
		<div
			class="container-head"
		>
			<div class="container-title">
				{{ formattedTitle[contentType] }}
			</div>
		</div>
		<MovieFilter 
			:genres="genresMovie"
			v-model:selected-genre="filterParams.genres"
			v-model:order="filterParams.order"
			v-model:year-from="filterParams.yearFrom"
			v-model:year-to="filterParams.yearTo"
			v-model:rating-from="filterParams.ratingFrom"
			v-model:rating-to="filterParams.ratingTo"
			@update:selected-genre="updateFilterParam('genres', $event)"
			@update:year-from="updateFilterParam('yearFrom', $event)"
			@update:year-to="updateFilterParam('yearTo', $event)" 
			@update:rating-fromo="updateFilterParam('ratingFrom', $event)" 
			@update:rating-to="updateFilterParam('ratingTo', $event)" 
			@update:order="updateFilterParam('order', $event)"
		/>

		<SpinnerLoader v-if="isLoading" />

		<MovieLists
			v-if="currentResults.length > 0"
			:movies="currentResults"
			hidden="true"
		/>
		<div ref="scrollComponent" />
	</div>
</template>