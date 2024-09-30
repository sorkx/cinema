<script setup>
const props = defineProps({
    person: {
        type: [Array, Object],
        required: true,
    },
})
</script>

<template>
	<div class="content-container">
		<div>{{  props.person?.nameEn || props.person?.nameRu  }}</div>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />