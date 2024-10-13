<script setup>
import {
    ref,
    onMounted,
} from 'vue'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'

const input = ref(null)

const modelValue = defineModel()

const props = defineProps({
    focusOnMounted: {
        type: Boolean,
    }
})

const emit = defineEmits(['close'])

const closeSearch = () => {
    emit('close')
}

onMounted(() => {
    if (props.focusOnMounted && typeof input.value?.focus === 'function') {
        return input.value?.focus()
    }
})
</script>

<template>
	<div
		v-click-outside="closeSearch"
		class="search__wrapper"
	>
		<div class="search__body">
			<div class="search__content">
				<div class="search-input">
					<UISymbol 
						name="search"
						class="search-input__icon" 
					/>
					<input
						ref="input" 
						type="text" 
						placeholder="Начните вводить поисковой запрос..."
						autocomplete="off"
						class="search-input__control"
						v-model="modelValue"
					/>
					<button
						@click="closeSearch" 
						class="search-input__close"
					>
						<UISymbol name="close" />
					</button>
				</div>
			</div>
			<div class="container search__container">
				<div class="search__result">
					<slot />
				</div>
			</div>
		</div>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />