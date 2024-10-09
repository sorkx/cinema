<script setup>
import {
    PostLists,
} from '@/widgets/Post'
import {
    storeToRefs,
} from 'pinia'
import { 
    newsModel,
} from '@/entities/MediaPost'
import {
    HorizontalLoader,
    SpinnerLoader,
} from '@/shared/ui/loaders'
import {
    useInfinityScroll
} from '@/shared/lib/use/useInfinityScroll'

const store = newsModel()

const { 
    posts,
    isLoading,
} = storeToRefs(store)

const fetchPosts = async () => await store.fetchMediaPosts(1)
const fetchNextPage = async () => await store.fetchNextPostsPage()

const { scrollComponent } = useInfinityScroll({
    fetchData: fetchPosts,
    fetchNextPage: fetchNextPage,
})
</script>

<template>
	<SpinnerLoader v-if="isLoading && !posts.length" />

	<div class="container">
		<PostLists
			:posts="posts"
			title="Новости"
		/>
		<div ref="scrollComponent" />

		<HorizontalLoader v-if="isLoading" />
	</div>
</template>