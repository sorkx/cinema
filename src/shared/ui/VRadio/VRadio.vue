<script setup>
const props = defineProps({
    value: {
        type: [String, Number],
        default: ''
    },
    label: {
        type: String,
        default: ''
    }
})

const modelValue = defineModel({ default: '' })

defineOptions({
    inheritAttrs: false
})
</script>

<template>
	<div class="v-radio">
		<label v-bind="$attrs">
			<input 
				type="radio"
				v-model="modelValue"
				:value="props.value"
				:checked="modelValue === props.value"
			/>
			{{ props.label }}
		</label>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />