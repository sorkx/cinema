<script setup>
import { 
    Movie,
} from '@/entities/Movie'
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
    },
    hidden: {
        type: String	,
    }
})
</script>

<template>
	<Pathway
		v-if="props.title && !props.hidden" 
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
</template>

<style src="./styles.scss" lang="scss" scoped />