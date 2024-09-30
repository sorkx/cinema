<script setup>
import { 
    Movie,
} from '@/entities/Movie'
import {
    SpinnerLoader,
} from '@/shared/ui/SpinnerLoader'
import {
    Pathway,
} from '@/shared/ui/Pathway'

const props = defineProps({
    movies: {
        type: Array,
    },
    title: {
        type: String,
        required: true,
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
		class="content-container"
	>
		<Pathway 
			:title="props.title"
		/>
		<div 
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