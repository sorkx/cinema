<script setup>
import {
    computed,
    ref,
    onMounted,
} from 'vue'

const props = defineProps({
    min: {
        type: [Number, String],
        default: '',
    },
    max: {
        type: [Number, String],
        default: '',
    },
    step: {
        type: Number,
        default: 1,
    },
    responsive: {
        type: String,
        default: '',
    },
})

const emit = defineEmits(['update:max', 'update:min'])

const minValue = ref(props.min)
const maxValue = ref(props.max)

const trackRef = ref(null)
const trackWidth = ref(0)
const isDragging = ref(false)
const activeThumb = ref(null)

const roundToStep = (value) => {
    const result = Math.round(value / props.step) * props.step
    return parseFloat(result.toFixed(10))
}

const leftPosition = computed(() => {
    return ((roundToStep(minValue.value) - props.min) / (props.max - props.min)) * 100
})

const rightPosition = computed(() => {
    return ((roundToStep(maxValue.value) - props.min) / (props.max - props.min)) * 100
})

const onMouseDown = (event, thumb) => {
    isDragging.value = true
    activeThumb.value = thumb
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
}

const onMouseMove = (event) => {
    if (!isDragging.value || !trackRef.value) return

    const rect = trackRef.value.getBoundingClientRect()
    const position = (event.clientX - rect.left) / rect.width
    const rawValue = position * (props.max - props.min) + props.min
    const steppedValue = roundToStep(rawValue)

    if (activeThumb.value === 'min') {
        minValue.value = Math.min(Math.max(steppedValue, props.min), roundToStep(maxValue.value - props.step))
    } else {
        maxValue.value = Math.max(Math.min(steppedValue, props.max), roundToStep(minValue.value + props.step))
    }

    emit('update:max', maxValue.value)
    emit('update:min', minValue.value)
}

const onMouseUp = () => {
    isDragging.value = false
    activeThumb.value = null
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
}

const leftPositionStyle = computed(() => {
    return `left: calc(${leftPosition.value}% - 10px)`
})

const rightPositionStyle = computed(() => {
    return `left: calc(${rightPosition.value}% - 10px)`
})

const filledPositionStyle = computed(() => {
    return `left: ${leftPosition.value}%; right: calc(${100 - rightPosition.value}%)`
})

onMounted(() => {
    if (trackRef.value) {
        trackWidth.value = trackRef.value.offsetWidth
    }
})
</script>

<template>
	<div class="v-range-slider">
		<div
			v-if="responsive !== 'mobile'" 
			class="v-range-slider__label"
		>
			{{ minValue }} - {{ maxValue }}
		</div>
		<div
			ref="trackRef"
			@mousedown="onMouseDown($event, 'track')" 
			class="v-range-slider__wrapper"
		>
			<div class="v-range-slider__track" />
			<div
				:style="filledPositionStyle"
				class="v-range-slider__track-filled" 
			/>
			<div 
				class="v-range-slider__thumb" 
				:style="leftPositionStyle"
				@mousedown.stop="onMouseDown($event, 'min')" 
			/>
			<div 
				class="v-range-slider__thumb" 
				:style="rightPositionStyle"
				@mousedown="onMouseDown($event, 'max')"
			/>
		</div>
		<div class="v-range-slider__bounds">
			<span>
				{{ minValue }}
			</span>
			<span>
				{{ maxValue }}
			</span>
		</div>	
	</div>
</template>

<style src="./styles.scss" lang="scss"  scoped />