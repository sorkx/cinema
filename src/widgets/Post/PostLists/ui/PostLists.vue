<script setup>
import {
    Post,
} from '@/entities/MediaPost'
import {
    Pathway,
} from '@/shared/ui/Pathway'

const props = defineProps({
    posts: {
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
})
</script>

<template>
	<Pathway
		v-if="props.title" 
		:title="props.title"
	/>
	<div class="container-head">
		<div class="container-title">
			Новости
		</div>
	</div>
	<div
		v-if="props.posts.length && props.posts" 
		class="media-posts"
	>
		<Post
			v-for="item in props.posts"
			:post="item"
			:key="item.kinopoiskId"
			class="media-posts__item"
		/>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />