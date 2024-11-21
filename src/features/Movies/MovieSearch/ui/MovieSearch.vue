<script setup>
import {
    watch,
    onBeforeUnmount,
    computed,
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
    ROUTE_NAMES,
} from '@/shared/lib/constants'
import {
    VButton,
} from '@/shared/ui/VButton'
import {
    useInfinityScroll
} from '@/shared/lib/use/useInfinityScroll'
import {
    CircleLoader,
} from '@/shared/ui/loaders'
import {
    useModal
} from '@/shared/lib/use/useModal'
import debounce from 'lodash.debounce'

const modal = useModal()
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
    searchMoviesResult,
    isLoading: storeLoading,
} = storeToRefs(searchStore)

const searchPerformed = ref(false)

const emit = defineEmits(['close'])

const closeSearch = () => {
    emit('close')
    searchStore.resetSearch()
    searchPerformed.value = false
}

const visibleEmptyElement = computed(() => !storeLoading.value && searchMoviesResult.value === 0 && searchPerformed.value)

const debouncedFetch = debounce(async () => {
    try {
        await searchStore.fetchKeywordMovie(1)
        searchPerformed.value = true
    } catch(error) {
        console.error(error)
    }
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

const fetchNextPage = async () => await searchStore.fetchNextPageMovies()

const { scrollComponent, isLoading: isLoadingMore } = useInfinityScroll({
    fetchData: fetchMovies,
    fetchNextPage: fetchNextPage,
})

watch(keywordMovies, (newKeyword) => {
    if (newKeyword) {
        storeLoading.value = true
        debouncedFetch()
    } else {
        debouncedFetch.cancel()
        storeLoading.value = false
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

		<MovieLists
			:movies="searchMovies"
			:empty="visibleEmptyElement"
			:backdrop="true"
			:loading="storeLoading && !isLoadingMore"
		>
			<template #button>
				<VButton
					tag="router-link"
					:to="{ name: ROUTE_NAMES.BROWSE }" 
					data-size="large"
					data-appearance="fill"
					class="empty-block__button"
					modificator="color-main"
					@click="modal.close()"
				>
					Перейти в каталог
				</VButton>
			</template>	
		</MovieLists>

		<CircleLoader v-if="isLoadingMore" />

		<div ref="scrollComponent" />
	</SearchInput>
</template>