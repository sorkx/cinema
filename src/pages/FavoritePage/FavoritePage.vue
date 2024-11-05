<script setup>
import {
    VWrapper,
} from '@/shared/ui/VWrapper'
</script>

<template>
	<VWrapper
		title="Избранное"
		:sub-header="false"
		class="favorites offset"
	>
		<template #content>
			<h1 class="title">Страница в процессе разработки</h1>
		</template>
	</VWrapper>
</template>

<style src="./styles.scss" lang="scss" scoped />