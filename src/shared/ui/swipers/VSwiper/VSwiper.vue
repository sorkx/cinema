<script setup>
import { 
    Pagination, 
    Navigation,
} from 'swiper'
import {
    toRefs,
} from 'vue'
import { 
    register,
} from 'swiper/element'
import SwiperButton from './buttons/SwiperButton.vue'

register()

const props = defineProps({
    slidesPerView: {
        type: Number,
        required: false,
        default: 1
    },
    spaceBetween: {
        type: Number,
        required: false,
        default: 0
    },
    hasPagination: {
        type: Boolean,
        required: false,
        default: true
    },
    hasNavigation: {
        type: Boolean,
        required: false,
        default: true
    }
})

const { slidesPerView, spaceBetween, hasPagination, hasNavigation } = toRefs(props)
const modules = [Pagination, Navigation]
</script>

<template>
	<swiper-container
		class="v-swiper"
		:modules="modules"
		:slides-per-view="slidesPerView"
		:space-between="spaceBetween"
		:pagination="{
			el: '.v-swiper__pagination',
			type: 'bullets',
			clickable: true
		}"
		:navigation="{
			nextEl: '.v-swiper__button--next',
			prevEl: '.v-swiper__button--prev'
		}"
	>
		<slot />
  
	  <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
		<div slot="container-end">
			<div
				v-if="hasPagination"
				class="v-swiper__pagination swiper-pagination row"
			/>
			<SwiperButton
				v-if="hasNavigation"
				class="v-swiper__button v-swiper__button--next"
			/>
			<SwiperButton
				v-if="hasNavigation"
				class="v-swiper__button v-swiper__button--prev"
			/>
		</div>
	</swiper-container>
  </template>

  <style src="./styles.scss" lang="scss" scoped />