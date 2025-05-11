<script setup>
import {
    watch,
    onBeforeUnmount,
    onMounted
} from 'vue'
import {
    SearchInput,
} from '@/shared/ui/SearchInput'
import {
    storeToRefs,
} from 'pinia'
import {
    searchModel,
} from '@/entities/Search'
import {
    VInfiniteScroll
} from '@/shared/ui/VInfiniteScroll'
import { 
    MovieCard,
} from '@/entities/Movie'
import {
    useRoute,
    useRouter,
} from 'vue-router'
import debounce from 'lodash.debounce'
import {
    VButton,
} from '@/shared/ui/VButton'
import {
    ROUTE_NAMES,
} from '@/shared/lib/constants'

const route = useRoute()
const router = useRouter()

const searchStore = searchModel()

const props = defineProps({
    focusOnMounted: {
        type: Boolean,
    }
})

const {
    keywordMovies,
    currentPage,
    searchMovies,
    searchCount,
    isLoading: storeLoading,
} = storeToRefs(searchStore)

const emit = defineEmits(['close'])

const closeSearch = () => {
    emit('close')
    searchStore.resetSearch()
}

const debouncedFetch = debounce(async () => {
    await searchStore.fetchKeywordMovie(1)
}, 1000)

const fetchMovies = async () => {
    if (currentPage.value < searchCount.value) {
        try {
            await searchStore.fetchKeywordMovie(currentPage.value)
        } catch(error) {
            console.error(error)
        }
    }
}

const fetchNextPage = async () => {
		    if (!storeLoading.value) {
        try {
            storeLoading.value = true
            await searchStore.fetchNextPageMovies()
        } catch (error) {
            console.error('Error loading more items:', error)
        } finally {
            storeLoading.value = false
        }
    }
}

const checkIsMovieAlreadyOpened = (movieSlug) => {
    if (route?.params?.slug === movieSlug) {
        emit('close')
    }
}

const routeBrowse = () => {
    router.push({ name: ROUTE_NAMES.BROWSE })
    emit('close')
}

watch(keywordMovies, (newKeyword) => {
    if (newKeyword) {
        storeLoading.value = true
        debouncedFetch()
    } else {
        debouncedFetch.cancel()
        storeLoading.value = false
        searchStore.resetSearch()
    }
})

onMounted(async () => await fetchMovies())

onBeforeUnmount(() => {
    debouncedFetch.cancel()
    searchStore.resetSearch()
})
</script>

<template>
	<SearchInput
		:focus-on-mounted="props.focusOnMounted"
		v-model="keywordMovies" 
		@close="closeSearch"
	>
		<VInfiniteScroll 
			empty="search"
			:pending="storeLoading" 
			:items="searchMovies ?? []"
			:hide-empty="keywordMovies.length === 0" 
			:disabled-backdrop="true"
			@loadNext="fetchNextPage"
			@close="emit('close')"
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
					:rating-kinopoisk="item.rating"
					class="resize"
					remove-hover-popup
					@on-card-click="checkIsMovieAlreadyOpened(item.kinopoiskId)"
					@click="modal.close()"
				/>
			</template>
			<template #empty-button>
				<VButton
					data-size="large"
					data-appearance="fill"
					class="empty-block__button"
					modificator="color-main"
					@click="routeBrowse"
				>
					Перейти в каталог
				</VButton>
			</template>
		</VInfiniteScroll>
	</SearchInput>
</template>