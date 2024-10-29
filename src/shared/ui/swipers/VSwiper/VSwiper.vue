<script setup>
import { 
    Pagination, 
    Navigation,
} from 'swiper/modules'
import {
    toRefs,
    reactive,
    computed,
} from 'vue'
import { 
    register,
} from 'swiper/element'
import SwiperButton from './buttons/SwiperButton.vue'

register()

const props = defineProps({
    hasNavigation: {
        type: Boolean,
        required: false,
        default: true,
    },
    speed: {
        type: Number,
        required: false,
        default: 700,
    },
    swiperType: { 
        type: String,
        validator: value => ['movies', 'media', 'genres', 'actor-filter'].includes(value),
    },

})

const moviesBreakpoints = reactive({
    320: {
        slidesPerView: 2.5,
        spaceBetween: 20,
    },
    640: {
        slidesPerView: 'auto',
        spaceBetween: 20,
    },
    768: {
        slidesPerView: 'auto',
        spaceBetween: 24,
    },
    1024: {
        slidesPerView: 3.8,
        spaceBetween: 24,
    },
    1439: {
        slidesPerView: 4.5,
        spaceBetween: 24,
    }
})

const mediaBreakpoints = {
    320: {
        slidesPerView: 2.5,
        spaceBetween: 20,
    },
}

const genresBreakpoints = {
    320: {
        slidesPerView: 'auto',
        spaceBetween: 12,
    },
}

const actorFilterBreakpoints = {
    320: {
        slidesPerView: 'auto',
        spaceBetween: 24,
    },
}

const { hasNavigation, speed } = toRefs(props)
const modules = [Pagination, Navigation]

const swiperBreakpoints = computed(() => {
    switch (props.swiperType) {
    case 'movies':
        return moviesBreakpoints
    case 'media':
        return mediaBreakpoints
    case 'genres':
        return genresBreakpoints
    case 'actor-filter':
        return actorFilterBreakpoints
    default:
        return moviesBreakpoints
    }
})

</script>

<template>
	<swiper-container
		class="v-swiper"
		:modules="modules"
		:speed="speed"
		mode="vertical"
		lazy="true"
		calculateHeight="true"
		:breakpoints="swiperBreakpoints"
		:navigation="{
			nextEl: '.v-swiper__button--next',
			prevEl: '.v-swiper__button--prev'
		}"
	>

		<slot />
  
	  <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
		<div slot="container-end">
			<div class="slider-control right">
				<SwiperButton
					v-if="hasNavigation"
					class="v-swiper__button v-swiper__button--next"
				/>
			</div>
			<div class="slider-control left">
				<SwiperButton
					v-if="hasNavigation"
					class="v-swiper__button v-swiper__button--prev"
				/>
			</div>
		</div>
	</swiper-container>
  </template>

  <style src="./styles.scss" lang="scss" scoped />