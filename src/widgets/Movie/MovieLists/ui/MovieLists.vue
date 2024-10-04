<script setup>
import { 
    Movie,
} from '@/entities/Movie'
import {
    SpinnerLoader,
} from '@/shared/ui/loaders'
import {
    Pathway,
} from '@/shared/ui/Pathway'

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
    }
})
</script>

<template>
	<SpinnerLoader v-if="props.loading" />

	<div
		v-else
	>
		<Pathway
			v-if="props.title" 
			:title="props.title"
		/>
		<div
			v-if="props.movies.length && props.movies" 
			class="lists"
		>
			<Movie
				v-for="item in props.movies"
				:movie="item"
				:key="item.id"
			/>
		</div>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />