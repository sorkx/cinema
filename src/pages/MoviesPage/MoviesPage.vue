<script setup>
import {
    watch,
    computed,
    onMounted,
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
    HorizontalLoader,
} from '@/shared/ui/loaders'
import {
    MovieFilter,
} from '@/features/Movies'

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

const fetchCategoryItems = async () => await store.fetchCategoryData(contentType.value, 1)
const fetchNextPage = async () => await store.fetchCategoryNextPage(contentType.value)

const { scrollComponent } = useInfinityScroll({
    fetchData: fetchCategoryItems,
    fetchNextPage: fetchNextPage,
})

watch(() => route.params.type, fetchCategoryItems, { immediate: true })

onMounted(async () => {
    await store.fetchMovieFilters()
})
</script>

<template>
	<SpinnerLoader v-if="isLoading" />

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
		<MovieFilter :genres="genresMovie" />
		<MovieLists
			v-if="state.categories[contentType]"
			:movies="state.categories[contentType].data"
			hidden="true"
		/>
		<div ref="scrollComponent" />

		<HorizontalLoader v-if="isLoading" />
	</div>
</template>