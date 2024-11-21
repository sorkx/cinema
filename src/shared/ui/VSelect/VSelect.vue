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
    VRadio,
} from '@/shared/ui/VRadio'

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
    items: {
        type: Array,
        default: () => [],
    },
    labelKey: { 
        type: String,
        default: ''
    },
})

const selectedModelValue = defineModel('selectedValue', { default: '' })

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

const selectedItemName = computed(() => {
    const selected = props.items.find(item => item.id === selectedModelValue.value)
    return selected ? selected[props.labelKey] : ''
})

const displayLabel = computed(() => {
    if (props.selectType === 'radio') {
        return selectedItemName.value || props.title
    }

    if (props.selectType === 'single') {
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

defineExpose({
    clearData
})

const displayOptions = computed(() => Object.values(orderFormatted))

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
    case 'radio':
        return 'radio'
    default:
        return 'single'
    }
})

defineOptions({
    inheritAttrs: false
})
</script>

<template>
	<div
		class="v-selector"
	>
		<div
			v-click-outside="() => toggleDropdown(false)"
			@click="toggleDropdown()"
			v-bind="$attrs" 
			:class="[
				'multiselect',
				selectedType,
				{ 
					'selected': isSelected || selectedItemName, 
					'is-open': isDropdownOpen, 
				}
			]"
		>
			<div 
				class="multiselect-wrapper"
				tabindex="0"
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
				<template v-if="props.selectType === 'radio'">
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
					<div
						@click="selectedModelValue = null"
						v-if="selectedItemName" 
						class="multiselect-clear"
					>
						<UISymbol 
							name="cross" 
							class="multiselect-icon"
						/>
					</div>
				</template>
			</div>
			<div
				v-show="isDropdownOpen" 
				class="multiselect-dropdown"
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
				<template v-if="selectType === 'radio'">
					<div class="multiselect-before-list">
						{{ props.title }} : {{ selectedItemName || 'Не выбрано' }}
						<span class="multiselect-divider" />
					</div>
					<ul
						v-if="selectType === 'radio'"
						class="multiselect-options"
					>
						<li
							v-for="item in items"
							:key="item.id"
							role="option"
							class="multiselect-option"
						>
							<VRadio
								v-model="selectedModelValue"
								:value="item.id"
								:label="item[props.labelKey]"
							/>
						</li>
					</ul>
				</template>
			</div>
		</div>
	</div>
  </template>
  
  <style src="./styles.scss" lang="scss" scoped />