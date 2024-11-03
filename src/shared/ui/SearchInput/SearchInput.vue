<script setup>
import {
    VInput
} from '@/shared/ui/VInput'
import {
    VModal
} from '@/shared/ui/VModal'

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
	<VModal 
		:header="true" 
		size="full"
		@close="closeSearch"
	>
		<template #header>
			<div class="search__panel container">
				<h5 class="title">
					Поиск
				</h5>
				<VInput 
					placeholder="Название фильма/сериала"
					v-model="modelValue"
					:focus-on-mounted="props.focusOnMounted"
				/>
			</div>
		</template>

		<template #content>
			<div class="search__result container">
				<div class="wrapper">
					<slot />
				</div>
			</div>
		</template>
	</VModal>
</template>

<style src="./styles.scss" lang="scss" scoped />