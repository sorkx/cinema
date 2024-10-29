<script setup>
import {
    UISymbol,
} from '@/shared/ui/UISymbol'
import {
    VButton,
} from '@/shared/ui/buttons'
import {
    VInput
} from '@/shared/ui/VInput'

const props = defineProps({
    focusOnMounted: {
        type: Boolean,
    }
})

const modelValue = defineModel({ default: '' })

const emit = defineEmits(['close'])

const closeSearch = () => {
    emit('close')
}
</script>

<template>
	<Teleport to="body">
		<div class="search__modal">
			<div class="search__overlay" />
			<div
				v-click-outside="closeSearch"
				class="search__wrapper"
				data-size="full"
			>
				<VButton
					@click="closeSearch" 
					class="search__close"
					appearance="text"
					size="icon"
				>
					<UISymbol name="close" />
				</VButton>
				<div class="search__header">
					<div class="search__panel">
						<h5 class="title">
							Поиск
						</h5>
						<VInput 
							placeholder="Название фильма/сериала"
							v-model="modelValue"
							:focus-on-mounted="props.focusOnMounted"
						/>
					</div>
				</div>
				<div class="search__content">
					<div class="search__result container">
						<div class="wrapper">
							<slot />
						</div>
					</div>
				</div>
			</div>
		</div>
	</Teleport>
</template>

<style src="./styles.scss" lang="scss" scoped />