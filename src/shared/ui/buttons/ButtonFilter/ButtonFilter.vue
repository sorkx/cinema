<script setup>
import {
	computed
} from 'vue'

const props = defineProps({
    title: {
        type: String,
        required: true
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
		{{ props.title }}
	</button>
</template>

<style src="./styles.scss" lang="scss" scoped />