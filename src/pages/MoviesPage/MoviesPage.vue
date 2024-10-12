<script setup>
import {
    watch,
    computed,
    onMounted,
    ref,
    reactive,
} from 'vue'
import { 
    useRoute,
    useRouter,
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
    HorizontalLoader,
} from '@/shared/ui/loaders'
import {
    MovieFilter,
} from '@/features/Movies'

const router = useRouter();
const route = useRoute()
const store = movieModel()

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
    genres: null,
    ratingTo: null,
    yearTo: null,
    order: ''
})

const fetchMovies = async (page = 1) => {
    await store.fetchCategoryData(contentType.value, page, filterParams)
}

const loadMore = async () => {
    await store.fetchCategoryNextPage(contentType.value, filterParams)
}

const fetchCategoryItems = async () => await fetchMovies(1)
const fetchNextPage = async () => await loadMore()

const updateFilterParam = (param, value) => {
    filterParams[param] = value
    fetchCategoryItems()
}

const { scrollComponent } = useInfinityScroll({
    fetchData: fetchCategoryItems,
    fetchNextPage: fetchNextPage,
})

watch(() => route.params.type, fetchCategoryItems)

onMounted(async () => {
    await store.fetchMovieFilters()
})
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
			v-model:selectedGenre="filterParams.genres"
			@update:selectedGenre="updateFilterParam(filterParams.genres, $event)" 
		/>

		<SpinnerLoader v-if="isLoading" />

		<MovieLists
			v-if="state.categories[contentType]"
			:movies="state.categories[contentType].data"
			hidden="true"
		/>
		<div ref="scrollComponent" />

		<HorizontalLoader v-if="isLoading" />
	</div>
</template>