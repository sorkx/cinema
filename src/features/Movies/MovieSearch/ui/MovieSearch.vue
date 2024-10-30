<script setup>
import {
    watch,
    onBeforeUnmount,
    ref,
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
    MovieLists,
} from '@/widgets/Movie'
import {
    CircleLoader,
} from '@/shared/ui/loaders'
import {
    useInfinityScroll
} from '@/shared/lib/use/useInfinityScroll'
import debounce from 'lodash.debounce'

const props = defineProps({
    focusOnMounted: {
        type: Boolean,
    }
})

const searchStore = searchModel()

const {
    keywordMovies,
    currentPage,
    searchMovies,
    searchCount,
    isLoading,
} = storeToRefs(searchStore)

const loading = ref(false)
const searchPerformed = ref(false)

const emit = defineEmits(['close'])

const closeSearch = () => {
    emit('close')
    searchStore.resetSearch()
    searchPerformed.value = false
}

const debouncedFetch = debounce(async (key) => {
    try {
        await searchStore.fetchKeywordMovie(key, 1)
        searchPerformed.value = true
    } finally {
        loading.value = false
    }
}, 1000)

const fetchMovies = async () => {
    if (!isLoading.value && currentPage.value < searchCount.value) {
        loading.value = true
        try {
            await searchStore.fetchKeywordMovie(keywordMovies.value, currentPage.value)
        } finally {
            loading.value = false
        }
    }
}

const fetchNextPage = async () => await searchStore.fetchNextPageMovies(keywordMovies.value)

const { scrollComponent } = useInfinityScroll({
    fetchData: fetchMovies,
    fetchNextPage: fetchNextPage,
})

watch(keywordMovies, (newKeyword) => {
    if (newKeyword) {
        loading.value = true
        debouncedFetch(newKeyword)
    } else {
        debouncedFetch.cancel()
        loading.value = false
        searchPerformed.value = false
        searchStore.resetSearch()
    }
})

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
		<CircleLoader v-if="loading" />

		<MovieLists
			v-else
			:movies="searchMovies"
			:key="searchMovies.length"
			:empty="searchPerformed"
			:backdrop="true"
		/>

		<CircleLoader v-if="isLoading && !loading" />

		<div ref="scrollComponent" />
	</SearchInput>
</template>