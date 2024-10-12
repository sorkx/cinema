<script setup>
import {
    ModuleWrapper,
} from '@/shared/ui/ModuleWrapper'
import {
    VButton
} from '@/shared/ui/buttons'
import {
    onMounted,
    ref,
} from 'vue'

const props = defineProps({
    genres: {
        type: Array,
        default: () => [],
    },
    selectedGenre: {
        type: Number,
        default: null,
    },
})

const emit = defineEmits(['update:selectedGenre'])

const localSelectedGenre = ref(props.selectedGenre)

const selectGenre = (id) => {
    if (localSelectedGenre.value === id) {
        localSelectedGenre.value = null
        emit('update:selectedGenre', null)
    } else {
        localSelectedGenre.value = id
        emit('update:selectedGenre', id)
    }
}

onMounted(() => {
    localSelectedGenre.value = props.selectedGenre;
})
</script>

<template>
	<ModuleWrapper
			:items="props.genres"
			swiper-type="genres"
			style="margin-bottom: 40px"
	>
		<template #slide="{ item }">
			<div :key="item.id">
				<VButton
					modificator="genre" 
					class="genre-button"
					@click="selectGenre(item.id)"
					:class="{ active: item.id === localSelectedGenre }"
				>
					<div 
						class="genre-icon"  
						:class="`genre-${item.id}`"

					/>
					{{ item.genre }}
				</VButton>
			</div>
		</template>
	</ModuleWrapper>
	<div class="dropdown__catalog">
		<div class="icon menu-left" />
		<div class="dropdown__catalog--container">
			<div class="dropdown__catalog--item">
				<p>По рейтингу</p>
				<div class="icon chevron-icon" />
			</div>
		</div>
		<div class="dropdown__catalog--container">
			<div class="dropdown__catalog--item">
				<p>Год выхода</p>
				<div class="icon chevron-icon" />
			</div>
		</div>
		<div class="dropdown__catalog--container">
			<div class="dropdown__catalog--item">
				<p>Рейтинг</p>
				<div class="icon chevron-icon" />
			</div>
		</div>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />