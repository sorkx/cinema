<script setup>
import {
    ModuleWrapper,
} from '@/shared/ui/ModuleWrapper'
import {
    VButton
} from '@/shared/ui/buttons'
import {
    computed,
} from 'vue'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'
import {
    Dropdown,
} from '@/shared/ui/Dropdown'

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

const emit = defineEmits(['update:selectedGenre', 'update:yearFrom, update:ratingTo', 'update:order'])

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

const selectGenre = (id) => {
    localSelectedGenre.value = localSelectedGenre.value === id ? null : id
}

const currentYear = new Date().getFullYear()

const years = Array.from({ length: 60 }, (_, i) => currentYear - i)
const ratings = [6.0, 7.0, 8.0, 9.0, 10.0].map(rating => rating.toFixed(1))
const sortOptions = ['По количеству голосов', 'По дате выхода', 'По рейтингу']
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
			class="icon" 
		/>
		<Dropdown 
			placeholder="Сортировка"
			:options="sortOptions"
			v-model:selectedValue="selectedSort"
			typeDropdown="sort"
		/>
		<Dropdown 
			placeholder="Год выхода"
			:options="years"
			v-model:selectedValue="selectedYear"
			typeDropdown="year"
		/>
		<Dropdown 
			placeholder="Рейтинг"
			:options="ratings"
			v-model:selectedValue="selectedRating"
			typeDropdown="rating"
		/>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />