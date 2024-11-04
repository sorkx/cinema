<script setup>
const props = defineProps({
    count: {
        type: [String, Number],
        default: '',
    },
    maxWidth: {
        type: [String, Number],
        default: '',
    },
    height: {
        type: [String, Number],
        default: '',
    },
    radius: {
        type: [String, Number],
        default: '',
    },
    gap: {
        type: [String, Number],
        default: '',
    },
    column: {
        type: Boolean,
        default: false
    }
})

const skeletonCount = Math.max(0, Math.ceil(Number(props.count)))
const skeletons = Array(skeletonCount).fill(null)
</script>

<template>
	<span 
		class="v-skeleton-loading"
		:class="{
			'v-skeleton-loading__column': props.column
		}" 
	>
		<span
			v-for="skeleton in skeletons"
			:key="skeleton"
			style="width: 100%"
			:style="{
				'height': props.height, 
				'max-width': props.maxWidth,
				'border-radius': props.radius,
			}" 
			class="v-skeleton-loading--chunk v-skeleton-loading__wave"
		/>
	</span>
</template>

<style src="./styles.scss" lang="scss" scoped />