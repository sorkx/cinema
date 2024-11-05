<script setup>
import {
    computed,
    ref,
} from 'vue'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'
import {
    VRangeSlider,
} from '@/shared/ui/VRangeSlider'
import {
    VCheckbox
} from '@/shared/ui/VCheckbox'

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
    title: {
        type: String,
        default: '',
    },
    selectType: {
        type: String,
        default: '',
    },
    selectedValue: {
        type: [String, Number],
        default: null,
    },
})

const orderFormatted = {
    RATING: 'По рейтингу',
    YEAR: 'По дате выхода',
    NUM_VOTE: 'По количеству голосов',
}

const emit = defineEmits(['update:max', 'update:min', 'update:selected-value'])

const minValue = ref(props.min)
const maxValue = ref(props.max)
const resetKey = ref(0)


const isDropdownOpen = ref(false)

const updateMinValue = (value) => {
    emit('update:min', value)
}

const updateMaxValue = (value) => {
    emit('update:max', value)
}

const displayLabel = computed(() => {
    if (props.selectType === 'single' || props.selectType === 'multiple') {
        return orderFormatted[props.selectedValue] || props.title
    }

    if (props.selectType === 'range' && minValue.value === props.min && maxValue.value === props.max) {
        return props.title
    } else {
        return `${minValue.value} - ${maxValue.value}`
    }
})

const isSelected = computed(() => {
    return minValue.value !== props.min || maxValue.value !== props.max
})

const toggleDropdown = (force) => {
    isDropdownOpen.value = force ?? !isDropdownOpen.value
}

const clearData = () => {
    minValue.value = props.min
    maxValue.value = props.max
    updateMinValue(props.min)
    updateMaxValue(props.max)
    resetKey.value++
}

const displayOptions = computed(() => {
    return Object.values(orderFormatted)
})

const selectOption = (option) => {
    const key = Object.keys(orderFormatted).find(k => orderFormatted[k] === option)
    if (key) {
        emit('update:selected-value', key)
    }
    isDropdownOpen.value = false
}

const isOptionSelected = (option) => {
    return orderFormatted[props.selectedValue] === option
}

const selectedType = computed(() => {
    switch (props.selectType) {
    case 'single':
        return 'single'
    case 'range':
        return 'range'
    case 'multiple':
        return 'multiple'
    default:
        return 'single'
    }
})
</script>

<template>
	<div
		class="v-selector"
	>
		<div
			v-click-outside="() => toggleDropdown(false)"
			@click="toggleDropdown()" 
			:class="[
				'multiselect',
				selectedType,
				{ 
					'selected': isSelected, 
					'is-open': isDropdownOpen, 
				}
			]"
		>
			<div 
				class="multiselect__wrapper"
				tabindex="0"
				role="combobox"
				aria-multiselectable="true"
			>
				<template v-if="props.selectType === 'single'">
					<div
						class="multiselect-label single"
					>
						{{ displayLabel }}
					</div>
					<div class="multiselect-caret">
						<UISymbol 
							name="chevron" 
							class="multiselect-icon"
						/>
					</div>
				</template>	
				<template v-if="props.selectType === 'range'">
					<div
						v-if="minValue || maxValue" 
						class="multiselect-placeholder"
					>
						{{ displayLabel }}
					</div>
					<div class="multiselect-caret">
						<UISymbol 
							name="chevron" 
							class="multiselect-icon"
						/>
					</div>
					<div
						@click="clearData"
						v-if="isSelected" 
						class="multiselect-clear"
					>
						<UISymbol 
							name="cross" 
							class="multiselect-icon"
						/>
					</div>
				</template>	
				<template v-if="props.selectType === 'multiple'">
					<div 
						class="multiselect__wrapper"
						tabindex="0"
						role="combobox"
						aria-multiselectable="true"
					>
						<div
							class="multiselect-placeholder"
						>
							{{ displayLabel }}
						</div>
						<div class="multiselect-caret">
							<UISymbol 
								name="chevron" 
								class="multiselect-icon"
							/>
						</div>
					</div>
				</template>
			</div>
			<div
				v-show="isDropdownOpen" 
				class="multiselect__dropdown"
				tabindex="-1"
			>
				<ul
					v-if="selectType === 'single'"
					role="listbox"
					class="multiselect-options"
				>
					<li
						v-for="option in displayOptions"
						:key="option"
						@click.stop="selectOption(option)"
						role="option"
						:class="[
							'multiselect-option', 
							{ 'is-selected is-pointed': isOptionSelected(option) }
						]"
					>
						<div 
							:class="[
								'single-option', 
								{ 'is-selected is-pointed': isOptionSelected(option) }
							]"
						>
							{{ option }}
						</div>
						<UISymbol
							v-if="isOptionSelected(option)" 
							:name="isOptionSelected(option) ? 'check' : ''" 
							class="multiselect-icon" 
						/>
					</li>
				</ul>
				<div
					v-if="selectType === 'range'"
					class="multiselect-range"
				>
					<VRangeSlider
						:step="props.step"
						:key="resetKey"
						:max="props.max"
						:min="props.min" 
						v-model:min="minValue"
						v-model:max="maxValue"
						@update:min="updateMinValue"
						@update:max="updateMaxValue"
					/>
				</div>
				<template v-if="selectType === 'multiple'">
					<div class="multiselect-before-list">
						<VCheckbox />
					</div>
				</template>
			</div>
		</div>
	</div>
  </template>
  
  <style src="./styles.scss" lang="scss" scoped />