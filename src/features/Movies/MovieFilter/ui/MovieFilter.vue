<script setup>
import {
    ModuleWrapper,
} from '@/shared/ui/ModuleWrapper'
import {
    VButton
} from '@/shared/ui/buttons'
import {
    computed,
    ref,
} from 'vue'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'
import {
    Dropdown,
} from '@/shared/ui/Dropdown'
import {
    Sidebar,
} from '@/shared/ui/Sidebar'

const openSidebar = ref(false)

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
    ratingTo: {
        type: [Number, String],
        default: '',
    },
    order: {
        type: [Number, String],
        default: '',
    }
})

const emit = defineEmits(['update:selectedGenre', 'update:yearFrom', 'update:ratingTo', 'update:order'])

const selectGenre = (id) => {
    localSelectedGenre.value = localSelectedGenre.value === id ? null : id
}

const localSelectedGenre = computed({
    get: () => props.selectedGenre,
    set: (value) => emit('update:selectedGenre', value)
})

const selectedYear = computed({
    get: () => props.yearFrom,
    set: (value) => emit('update:yearFrom', value)
})

const selectedRating = computed({
    get: () => props.ratingTo,
    set: (value) => emit('update:ratingTo', value)
})

const selectedSort = computed({
    get: () => props.order,
    set: (value) => emit('update:order', value)
})

const yearsFill = computed(() => Array.from(
    { length: 60 }, 
    (_, i) => new Date().getFullYear() - i)
)

const ratingsFill = computed(() => [6.0, 7.0, 8.0, 9.0, 10.0].map(rating => rating.toFixed(1)))

const sortOptions = ['По количеству голосов', 'По дате выхода', 'По рейтингу']

const dropdowns = computed(() => [
    {
        placeholder: 'Сортировка',
        options: sortOptions,
        get selectedValue() { return selectedSort.value; },
        set selectedValue(value) { selectedSort.value = value; },
        typeDropdown: 'sort'
    },
    {
        placeholder: 'Год выхода',
        options: yearsFill.value,
        get selectedValue() { return selectedYear.value; },
        set selectedValue(value) { selectedYear.value = value; },
        typeDropdown: 'year'
    },
    {
        placeholder: 'Рейтинг',
        options: ratingsFill.value,
        get selectedValue() { return selectedRating.value; },
        set selectedValue(value) { selectedRating.value = value; },
        typeDropdown: 'rating'
    }
])

const toggleDropdown = (force) => {
    openSidebar.value = force ?? !openSidebar.value
}
</script>

<template>
	<ModuleWrapper
			:items="props.genres"
			swiper-type="genres"
			style="margin-bottom: 40px"
	>
		<template #slide="{ item }">
			<div :key="item.id">
				<VButton
					modificator="genre" 
					class="genre-button"
					@click="selectGenre(item.id)"
					:class="{ active: item.id === localSelectedGenre }"
				>
					<UISymbol 
						:name="`genre-${item.id}`"
						class="genre-icon"
					/>
					{{ item.genre }}
				</VButton>
			</div>
		</template>
	</ModuleWrapper>
	<div class="dropdown__catalog">
		<UISymbol 
			name="menu-left" 
			class="icon menu-left" 
		/>
		<Dropdown 
			v-for="dropdown in dropdowns"
			:key="dropdown.typeDropdown"
			:placeholder="dropdown.placeholder"
			:options="dropdown.options"
			v-model:selectedValue="dropdown.selectedValue"
			:typeDropdown="dropdown.typeDropdown"
			:class="[`${dropdown.typeDropdown}`, `hidden-${dropdown.typeDropdown}`]"
		/>
		<div class="dropdown__catalog--buttons">
			<VButton
				modificator="filter"
				class="filter-button"
				@click="toggleDropdown()"
			>
				<UISymbol 
					name="slider"
				/>
			</VButton>
		</div>
	</div>
	<Transition name="slide-fade">
		<Sidebar
			:sidebarItems="ratingsFill"
			title="Рейтинг"
			type="rating"
			v-show="openSidebar"
			@close="toggleDropdown(false)" 
		/>
	</Transition>
</template>

<style src="./styles.scss" lang="scss" scoped />