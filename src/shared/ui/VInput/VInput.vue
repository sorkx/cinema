<script setup>
import {
    ref,
    onMounted,
} from 'vue'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'

const props = defineProps({
    placeholder: {
        type: String,
        default: '',
    },
    focusOnMounted: {
        type: Boolean,
    }
})

const input = ref(null)

const modelValue = defineModel({ default: '' })

const clearInput = () => {
    modelValue.value = ''
}

onMounted(() => {
    if (props.focusOnMounted && typeof input.value?.focus === 'function') {
        return input.value?.focus()
    }
})
</script>

<template>
	<div class="v-input v-input-group">
		<div class="v-input__wrapper">
			<label for="search" />
			<div class="v-input__icon v-input__icon--search">
				<UISymbol 
					name="search"
				/>
			</div>
			<input
				ref="input"
				id="search" 
				type="search"
				name="search" 
				:placeholder="props.placeholder"
				class="v-input__field transparent"
				v-model="modelValue"
			/>
			<div 
				v-if="modelValue.length > 0"
				@click="clearInput"
				class="v-input__icon v-input__icon--toggle">
				<UISymbol 
					name="close"
				/>
			</div>
		</div>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />