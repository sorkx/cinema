<script setup>
import {
    UISymbol,
} from '@/shared/ui/UISymbol'

const props = defineProps({
    post: {
        type: [Array, Object],
    },
})

const date = new Date(props.post?.publishedAt)
const formattedDate = date.toLocaleDateString('ru-RU')
</script>

<template>
	<div
		v-if="props.post.length" 
		class="loader loader--news card-news__image"
	>
		<div class="logo loader-logo">
			<UISymbol 
				name="logo"
			/>
		</div>
	</div>
	<a
		v-else
		:href="props.post?.url"
		target="_blank"
		class="card-news"
	>
		<div class="card-news__overlay">
			<img
				:src="props.post?.imageUrl" 
				class="card-news__image card-news__image--inner"
			/>
			<div class="card-news__content">
				<div class="card-news__label">
					SORK | NEWS
				</div>
				<div class="card-news__title">
					{{ props.post?.title }}
				</div>
				<div class="card-news__date">
					{{ formattedDate }}
				</div>
			</div>
		</div>
	</a>
</template>

<style src="./styles.scss" lang="scss" scoped />