<script setup>
import { 
    Movie,
} from '@/entities/Movie'
import {
    Pathway,
} from '@/shared/ui/Pathway'
import {
    VButton,
} from '@/shared/ui/buttons'
import {
    ROUTE_NAMES,
} from '@/shared/lib/constants'

const props = defineProps({
    movies: {
        type: Array,
        default: () => [],
    },
    title: {
        type: String,
        default: '',
    },
    loading: {
        type: Boolean,
        default: false,
    },
    hidden: {
        type: String,
    },
    empty: {
        type: Boolean,
        default: false,
    },
})
</script>

<template>
	<Pathway
		v-if="props.title && !props.hidden" 
		:title="props.title"
	/>
	<div
		v-if="props.movies.length && props.movies" 
		class="infinite-container"
	>
		<Movie
			v-for="item in props.movies"
			:movie="item"
			:key="item.id"
		/>
	</div>

	<div 
		v-if="!props.movies.length && props.empty"
		class="infinite-container__empty"
	>
		<div class="empty-block">
			<div class="empty-block__header">
				Поиск не дал результата
			</div>
			<router-link
				class="empty-block__link" 
				:to="{ name: ROUTE_NAMES.MAIN }"
			>
				<VButton 
					modificator="main"
					class="empty-block__button"
				>
					Перейти на главную
				</VButton>
			</router-link>
		</div>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />