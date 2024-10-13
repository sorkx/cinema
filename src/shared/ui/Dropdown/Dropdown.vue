<script setup>
import {
    ref,
    computed,
} from 'vue'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'
import { 
    onClickOutside,
} from '@vueuse/core'

const dropdown = ref(null)

const props = defineProps({
    selectedValue: {
        type: [String, Number],
        default: null
    },
    placeholder: {
        type: String,
        default: ''
    },
    options: {
        type: Array,
        required: () => [],
    },
    typeDropdown: {
        type: String,
    }
})

const orderFormatted = {
    RATING: 'По рейтингу',
    YEAR: 'По дате выхода',
    NUM_VOTE: 'По количеству голосов',
}

const emit = defineEmits(['update:selectedValue'])

const isDropdownOpen = ref(false)
const searchQuery = ref('')

const displayOptions = computed(() => {
    if (props.typeDropdown === 'sort') {
        return Object.values(orderFormatted)
    }
    return props.options.filter(option => 
        option.toString().toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})

const selectedLabel = computed(() => {
    if (props.typeDropdown === 'sort') {
        return orderFormatted[props.selectedValue] || ''
    }
    return props.selectedValue
})


const handleToggle = () => isDropdownOpen.value = !isDropdownOpen.value
const handleInputClick = (event) => event.stopPropagation()

const selectOption = (option) => {
    if (props.typeDropdown === 'sort') {
        const key = Object.keys(orderFormatted).find(k => orderFormatted[k] === option)
        if (key) {
            emit('update:selectedValue', key)
        }
    } else {
        emit('update:selectedValue', option)
    }
    isDropdownOpen.value = false
}

const handleIconClick = () => {
    if (props.selectedValue) {
        emit('update:selectedValue', null)
    } else {
        isDropdownOpen.value = true
    }
}

const isOptionSelected = (option) => {
    if (props.typeDropdown === 'sort') {
        return orderFormatted[props.selectedValue] === option
    }
    return props.selectedValue === option
}

onClickOutside(dropdown, () => isDropdownOpen.value = false)
</script>

<template>
	<div
		ref="dropdown" 
		class="dropdown__catalog--container"
		@click="handleToggle"
	>
		<div class="dropdown__catalog--item">
			<p>{{ selectedLabel || props.placeholder }}</p>
			<UISymbol 
				:name="props.selectedValue ? 'cross' : 'chevron'" 
				:class="[
					'icon-dropdown',
					{ 'active-dropdown': isDropdownOpen }
				]"
				@click="handleIconClick" 
			/>
			<div class="dropdown__body">
				<ul 
					v-show="isDropdownOpen"
					class="dropdown__options"
				>
					<input
						v-if="typeDropdown === 'year'" 
						placeholder="Ищу..."
						v-model="searchQuery"
						@click="handleInputClick" 
					/>
					<li
						v-for="option in displayOptions"
						:key="option"
						@click.stop="selectOption(option)"
					>
						{{ option }}
					<UISymbol
						v-if="isOptionSelected(option)" 
						:name="isOptionSelected(option) ? 'check' : ''" 
						class="icon" 
					/>
					</li>
					<li 
						v-if="displayOptions.length === 0 && typeDropdown === 'year'"
						class="dropdown__options--empty"
					>
						Ничего не найдено
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />