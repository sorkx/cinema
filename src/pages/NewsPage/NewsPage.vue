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
} from '@/shared/ui/loaders'
import {
    useInfinityScroll
} from '@/shared/lib/use/useInfinityScroll'

const store = newsModel()

const { 
    posts,
    currentPage,
    isLoading,
} = storeToRefs(store)

const fetchPosts = async () => await store.fetchMediaPosts(currentPage.value)
const fetchNextPage = async () => await store.fetchNextPostsPage()

const { scrollComponent } = useInfinityScroll({
    fetchData: fetchPosts,
    fetchNextPage: fetchNextPage,
})
</script>

<template>
	<div class="container">
		<PostLists
			:posts="posts"
			title="Новости"
		/>
		<div ref="scrollComponent" />

		<HorizontalLoader v-if="isLoading" />
	</div>
</template>