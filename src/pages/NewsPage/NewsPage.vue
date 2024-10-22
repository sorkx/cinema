<script setup>
import {
    ref,
} from 'vue'
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
    CircleLoader,
    SpinnerLoader,
} from '@/shared/ui/loaders'
import {
    useInfinityScroll
} from '@/shared/lib/use/useInfinityScroll'

const store = newsModel()

const isLoadingMore = ref(false)
const isLoading = ref(true)

const { 
    posts,
} = storeToRefs(store)

const fetchPosts = async () => {
    isLoading.value = true

    await store.fetchMediaPosts(1)

    isLoading.value = false
}

const fetchNextPage = async () => {
    if (isLoading.value) return

    isLoadingMore.value = true

    await store.fetchNextPostsPage()

    isLoadingMore.value = false
}

const { scrollComponent } = useInfinityScroll({
    fetchData: fetchPosts,
    fetchNextPage: fetchNextPage,
})
</script>

<template>
	<SpinnerLoader v-if="isLoading && !posts.length" />

	<div class="wrapper offset">
		<div class="wrapper-header">
			<div class="wrapper-title">
				Новости
			</div>
		</div>
		<div class="wrapper-subheader" />

		<PostLists :posts="posts" />

		<CircleLoader v-if="isLoadingMore" />

		<div ref="scrollComponent" />
	</div>
</template>