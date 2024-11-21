<script setup>
import {
    computed,
    watch,
    ref,
} from 'vue'
import {
    Sidebar,
} from '@/shared/ui/Sidebar'
import {
    VSelect,
} from '@/shared/ui/VSelect'
import {
    VSkeleton,
} from '@/shared/ui/VSkeleton'
import {
    useRoute,
} from 'vue-router'
import { 
    sidebarOpen,
    toggleSidebar,
} from '@/shared/lib/use/useSidebar'

const route = useRoute()

const props = defineProps({
    genres: {
        type: Array,
        default: () => [],
    },
    countries: {
        type: Array,
        default: () => [],
    },
    selectedCountry: {
        type: [Number, String],
        default: '',
    },
    selectedGenre: {
        type: [Number, String],
        default: '',
    },
    yearFrom: {
        type: [Number, String],
        default: '',
    },
    yearTo: {
        type: [Number, String],
        default: '',
    },
    ratingFrom: {
        type: [Number, String],
        default: '',
    },
    ratingTo: {
        type: [Number, String],
        default: '',
    },
    order: {
        type: [Number, String],
        default: '',
    },
    isLoadingFilters: {
        type: Boolean,
        default: false
    },
})

const childElements = ref([])

const genreValue = defineModel('selectedGenre', { default: '' })
const countriesValue = defineModel('selectedCountry', { default: '' })
const yearFromValue = defineModel('yearFrom', { default: '' })
const yearToValue = defineModel('yearTo', { default: '' })
const ratingFromValue = defineModel('ratingFrom', { default: '' })
const ratingToValue = defineModel('ratingTo', { default: '' })
const sortValue = defineModel('order', { default: '' })

const sidebarItems = computed(() => [
    {
        title: 'Год выхода',
        min: 1925,
        max: new Date().getFullYear(),
        type: 'range',
        step: 1,
        range: {
            from: yearFromValue.value,
            to: yearToValue.value
        },
        updateFrom: (value) => yearFromValue.value = value,
        updateTo: (value) => yearToValue.value = value
    },
    {
        title: 'Рейтинг',
        min: 0,
        max: 10,
        type: 'range',
        step: 0.1,
        range: {
            from: ratingFromValue.value,
            to: ratingToValue.value
        },
        updateFrom: (value) => ratingFromValue.value = value,
        updateTo: (value) => ratingToValue.value = value
    }
])

const visibleFilters = computed(() => route.params.type !== 'genre')

const resetFilters = () => {
    sortValue.value = ''
    countriesValue.value = ''
	
    if (route.params.type !== 'genre') {
        genreValue.value = ''
    }

    childElements.value.forEach(element => {
        element?.clearData()
    })
}

defineExpose({
    resetFilters
})

watch(sidebarOpen, async (newVal) => {
    if (newVal) {
        document.documentElement.classList.add('sidebar-page')
    } else {
        document.documentElement.classList.remove('sidebar-page')
    }
})
</script>

<template>
	<div
		v-if="props.isLoadingFilters" 
		class="skeleton-filters"
	>
		<div class="skeleton-filters__selectors">
			<VSkeleton 
				:config="{
					count: 3,
					container: {
						gap: '0.5rem',
					},
					item: {
						height: '38px',
						maxWidth: '160px',
						borderRadius: '0.5rem'
					}
				}"
			/>
			<div class="skeleton-filters__spacer" />
			<VSkeleton 
				:config="{
					count: 1,
					container: {
						maxWidth: '200px',
						gap: '0.5rem',
					},
					item: {
						height: '38px',
						maxWidth: '100%',
						borderRadius: '0.5rem'
					}
				}"
			/>
		</div>
	</div>
	<div
		v-else
		class="page-filters"
	>
		<div class="page-filters__selectors">
			<div class="page-filters__selectors-wrap">
				<template v-if="visibleFilters">
					<VSelect
						:items="props.genres"
						class="multiselect--left"
						title="Жанр"
						select-type="radio"
						label-key="genre"
						v-model:selected-value="genreValue"
					/>
				</template>
				<VSelect
					:items="props.countries"
					class="multiselect--left"
					title="Страна"
					select-type="radio"
					label-key="country"
					v-model:selected-value="countriesValue"
				/>
				<VSelect
					v-for="(item, index) in sidebarItems"
					:ref="el => childElements[index] = el"
					:key="item.title"
					:step="item.step"
					:title="item.title"
					:select-type="item.type"
					:min="item.min"
					:max="item.max"
					@update:min="item.updateFrom"
					@update:max="item.updateTo"
					class="multiselect--left" 
				/> 
			</div>
			<VSelect
				title="Сортировка"
				class="multiselect--right"
				select-type="single"
				v-model:selected-value="sortValue"
			/>
		</div>
	</div>
	<Sidebar
		:items="sidebarItems"
		v-show="sidebarOpen"
		:animation="sidebarOpen"
		@reset="resetFilters"
		@close="toggleSidebar(false)"
	/>
</template>

<style src="./styles.scss" lang="scss" scoped />