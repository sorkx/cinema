<script setup>
import {
    computed,
    ref,
    watch,
} from 'vue'
import {
    VButton
} from '@/shared/ui/VButton'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'
import {
    Sidebar,
} from '@/shared/ui/Sidebar'
import {
    VSelect,
} from '@/shared/ui/VSelect'
import {
    VSkeleton,
} from '@/shared/ui/VSkeleton'

const props = defineProps({
    genres: {
        type: Array,
        default: () => [],
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
    isLoading: {
        type: Boolean,
        default: false
    },
})

const emit = defineEmits([
    'update:selectedGenre',  
    'update:yearFrom', 
    'update:yearTo',
    'update:ratingFrom',  
    'update:ratingTo', 
    'update:order'
])

const openSidebar = ref(false)

const updateYearFrom = computed({
    get: () => props.yearFrom,
    set: (value) => emit('update:yearFrom', value)
})

const updateYearTo = computed({
    get: () => props.yearTo,
    set: (value) => emit('update:yearTo', value)
})

const updateRatingFrom = computed({
    get: () => props.ratingFrom,
    set: (value) => emit('update:ratingFrom', value)
})

const updateRatingTo = computed({
    get: () => props.ratingTo,
    set: (value) => emit('update:ratingTo', value)
})

const selectedSort = computed({
    get: () => props.order,
    set: (value) => emit('update:order', value)
})

const sidebarItems = computed(() => [
    {
        title: 'Год выхода',
        min: 1925,
        max: new Date().getFullYear(),
        type: 'range',
        step: 1,
        range: {
            from: updateYearFrom.value,
            to: updateYearTo.value
        },
        updateFrom: (value) => updateYearFrom.value = value,
        updateTo: (value) => updateYearTo.value = value
    },
    {
        title: 'Рейтинг',
        min: 0,
        max: 10,
        type: 'range',
        step: 0.1,
        range: {
            from: updateRatingFrom.value,
            to: updateRatingTo.value
        },
        updateFrom: (value) => updateRatingFrom.value = value,
        updateTo: (value) => updateRatingTo.value = value
    }
])

const resetFilters = () => {
    updateYearFrom.value = 1925
    updateYearTo.value = new Date().getFullYear()
    updateRatingFrom.value = 0
    updateRatingTo.value = 10
}

const toggleDropdown = (force) => {
    openSidebar.value = force ?? !openSidebar.value
}

watch(openSidebar, async (newVal) => {
    if (newVal) {
        document.documentElement.classList.add('sidebar-page')
    } else {
        document.documentElement.classList.remove('sidebar-page')
    }
})

// $route.params.type !== 'genre' ? 4 : 3
</script>

<template>
	<div
		v-if="props.isLoading" 
		class="skeleton-filters"
	>
		<div class="skeleton-filters__selectors">
			<VSkeleton 
				:count="3"
				maxWidth="160px"
				height="38px"
				radius="0.5rem"
				gap="0.5rem"
			/>
		</div>
	</div>
	<div
		v-else
		class="page-filters"
	>
		<div class="page-filters__selectors">
			<div class="page-filters__selectors-wrap">
				<!-- <VSelect
					v-if="$route.params.type !== 'genre'"
					title="Жанр"
					select-type="multiple"
				/> -->
				<VSelect
					title="Сортировка"
					select-type="single"
					v-model:selected-value="selectedSort"
				/>
				<div class="page-filters__selectors-wrap__slider">
					<VSelect
						v-for="item in sidebarItems"
						:key="item.title"
						:step="item.step"
						:title="item.title"
						:select-type="item.type"
						:min="item.min"
						:max="item.max" 
						@update:min="item.updateFrom($event)"
						@update:max="item.updateTo($event)" 
					/> 
				</div>
			</div>
			<div class="browse-filters">
				<VButton
					size="small"
					modificator="color-white"
					appearance="text"
					class="filter-button"
					@click="toggleDropdown()"
				>
					<UISymbol 
						name="slider"
					/>
				</VButton>
			</div>
		</div>
	</div>
	<Sidebar
		:items="sidebarItems"
		v-show="openSidebar"
		:animation="openSidebar"
		@reset="resetFilters"
		@close="toggleDropdown(false)"
	/>
</template>

<style src="./styles.scss" lang="scss" scoped />