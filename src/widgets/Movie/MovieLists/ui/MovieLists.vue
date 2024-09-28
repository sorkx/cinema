<script setup>
import { 
    Movie,
} from '@/entities/Movie'

const props = defineProps({
    movies: {
        type: Array,
    },
    title: {
        type: String,
        required: true,
    },
})
</script>

<template>
	<div
		class="content-container"
	>
		<ul class="pathway">
			<li class="pathway__item">
				<router-link
					class="pathway__link router-link-exact-active"
					to="/"
				>
					Главная
				</router-link>
			</li>
			<li class="pathway__separator">
				/
			</li>
			<li class="pathway__item">
				{{ props.title }}
			</li>
		</ul>
		<div class="container__head">
			<h1 class="container__title">
				{{ props.title }}
			</h1>
		</div>
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