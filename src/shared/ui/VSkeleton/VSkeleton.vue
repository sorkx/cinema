<script setup>
const props = defineProps({
    config: {
        type: Object,
        default: () => ({
            count: '',
            column: false,
            container: {
                maxWidth: '',
                gap: ''
            },
            item: {
                height: '',
                maxWidth: '',
                minWidth: '',
                radius: ''
            }
        })
    }
})

const skeletonCount = Math.max(0, Math.ceil(Number(props.config.count)))
const skeletons = Array(skeletonCount).fill(null)
</script>

<template>
	<span 
		class="v-skeleton-loading"
		:style="config.container"
		:class="{
			'v-skeleton-loading__column': config.column
		}" 
	>
		<span
			v-for="skeleton in skeletons"
			:key="skeleton"
			:style="{
 				...config.item,
				'width': '100%',
			}" 
			class="v-skeleton-loading--chunk v-skeleton-loading__wave"
		/>
	</span>
</template>

<style src="./styles.scss" lang="scss" scoped />