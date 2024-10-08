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
	<a
		:href="props.post?.url"
		target="_blank"
		class="card-news"
	>
		<UISymbol 
			name="horizontal"
			class="card-news__image"
			loading="lazy"
		/>
		<div class="card-news__overlay">
			<img
				:src="props.post?.imageUrl" 
				class="card-news__image card-news__image--inner"
				loading="lazy"
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