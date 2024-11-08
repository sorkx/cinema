<script setup>
import {
    computed,
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
    CircleLoader,
} from '@/shared/ui/loaders'
import {
    MovieFilter,
} from '@/features/Movies'
import debounce from 'lodash.debounce'
import {
    VWrapper,
} from '@/shared/ui/VWrapper'

const route = useRoute()
const store = movieModel()

const currentResults = ref([])
const isLoadingMore = ref(false)
const isLoading = ref(true)

const { 
    state,
    genresMovie,
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

const filterParams = reactive({
    genres: +route.params.id || '',
    ratingFrom: '',
    ratingTo: '',
    yearTo: '',
    yearFrom: '',
    order: ''
})

const loadMore = async () => {
    if (isLoading.value) return

    isLoadingMore.value = true

    await store.fetchCategoryNextPage(contentType.value, filterParams)
    currentResults.value = state.value.categories[contentType.value]?.data

    isLoadingMore.value = false
}

const fetchCategoryItems = async () => {
    isLoading.value = true

    currentResults.value = []
    await store.fetchCategoryData(contentType.value, 1, filterParams)
    currentResults.value = state.value.categories[contentType.value]?.data

    isLoading.value = false
}

const updateFilterParam = debounce((param, value) => {
    filterParams[param] = value
    fetchCategoryItems()
}, 500)

const { scrollComponent } = useInfinityScroll({
    fetchData: fetchCategoryItems,
    fetchNextPage: loadMore,
})

const movieId = computed(() => +route.params.id)
const movieType = computed(() => route.params.type)

const genres = computed(() => {
    return genresMovie.value.map((item) => {
        const char = item.genre.charAt(0)
        return {
            ...item,
            genre: char.toUpperCase() + item.genre.slice(1)
        }
    })
})

const saveCurrentGenre = (genreName) => {
    localStorage.setItem('currentGenre', genreName)
}

const getCurrentGenre = () => {
    return localStorage.getItem('currentGenre')
}

const currentGenre = computed(() => {
    if (contentType.value) {
        return formattedTitle[contentType.value]
    }
    
    const genre = genres.value.find(g => g.id === movieId.value)?.genre

    if (genre) {
        saveCurrentGenre(genre)
    }
    return genre || getCurrentGenre() || ''
})

watch(() => movieType.value, fetchCategoryItems, { immediate: true })
</script>

<template>
	<VWrapper
		:title="currentGenre"
		:sub-header="true"
		class="offset"
	>
		<template #content>
			<MovieFilter 
				:genres="genresMovie"
				v-model:selected-genre="filterParams.genres"
				v-model:order="filterParams.order"
				v-model:year-from="filterParams.yearFrom"
				v-model:year-to="filterParams.yearTo"
				v-model:rating-from="filterParams.ratingFrom"
				v-model:rating-to="filterParams.ratingTo"
				@update:year-from="updateFilterParam('yearFrom', $event)"
				@update:year-to="updateFilterParam('yearTo', $event)" 
				@update:rating-fromo="updateFilterParam('ratingFrom', $event)" 
				@update:rating-to="updateFilterParam('ratingTo', $event)" 
				@update:order="updateFilterParam('order', $event)"
			/>

			<MovieLists
				v-if="currentResults.length > 0"
				:movies="currentResults"
				hidden="true"
			/>

			<CircleLoader v-if="isLoadingMore || isLoading" />

			<div ref="scrollComponent" />
		</template>
	</VWrapper>
</template>