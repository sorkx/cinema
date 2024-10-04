<script setup>
import {
	computed
} from 'vue'

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    itemLength: {
        type: Number,
    },
    active: {
        type: Boolean,
        default: false
    }
})

const isActive = computed(() => props.active)

const emit = defineEmits(['click'])

const onClick = () => emit('click')
</script>

<template>
	<button
		type="button" 
		:class="['v-button-filter', { active: isActive }]"
		@click="onClick"
	>
		{{ props.title }} {{ props.itemLength }}
	</button>
</template>

<style src="./styles.scss" lang="scss" scoped />