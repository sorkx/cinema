<script setup>
import {
    ModuleWrapper,
} from '@/shared/ui/ModuleWrapper'
import {
    VButton
} from '@/shared/ui/buttons'

const props = defineProps({
    genres: {
        type: Array,
        default: () => [],
    }
})

</script>

<template>
	<ModuleWrapper
			:items="props.genres"
			width="auto"
			swiper-type="genres"
	>
		<template #slide="{ item }">
			<div 
				:key="item.id"
			>
				<VButton
					modificator="genre" 
					class="genre-button"
				>
					<div class="genre-icon" :class="`genre-${item.id}`" />
					{{ item.genre }}
				</VButton>
			</div>
		</template>
	</ModuleWrapper>
</template>

<style src="./styles.scss" lang="scss" scoped />