<script setup>
import {
    Post,
} from '@/entities/MediaPost'

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