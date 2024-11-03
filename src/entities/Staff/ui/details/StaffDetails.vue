<script setup>
import {
    RouletteSlider,
} from '@/shared/ui/RouletteSlider'
import{
    VButton,
} from '@/shared/ui/VButton'
import {
    MovieLists,
} from '@/widgets/Movie/MovieLists'
import {
    SpinnerLoader,
} from '@/shared/ui/loaders'
import {
    computed,
    onMounted,
    ref,
} from 'vue'

const props = defineProps({
    person: {
        type: [Object, Array],
        default: () => ({})
    },
    loading: {
        type: Boolean,
        default: false
    }
})

const professionMapping ={
    'ACTOR': 'Актер',
    'ACTRESS': 'Актриса',
    'HIMSELF': 'Сам себя',
    'PRODUCER': 'Продюсер',
    'WRITER': 'Сценарист',
    'VOICE_MALE': 'Мужской голос',
    'VOICE_FEMALE': 'Женский голос',
    'DIRECTOR': 'Режиссер',
    'HRONO_TITR_MALE': 'Указан в титрах',
}

const currentFilter = ref('')

const filters = computed(() => {
    if (!Array.isArray(props.person.films)) {
        return []
    }

    const professionMap = props.person.films.reduce((acc, film) => {
        const key = film.professionKey || 'UNKNOWN'
        acc[key] = (acc[key] || 0) + 1
        return acc
    }, {})


    return Object.entries(professionMap).map(([key, count]) => ({
        professionKey: key,
        count,
    }))
})

const setFilter = (key) => {
    currentFilter.value = key
}

const filteredFilms = computed(() => {
    return props.person.films.filter(film => film.professionKey === currentFilter.value)
})

onMounted(() => setFilter('ACTOR'))
</script>

<template>
	<SpinnerLoader v-if="props.loading" />

	<div 
		v-else
		class="person full-width"
	>
		<div class="person__header">
			<div class="person__image">
				<img 
					:src="props.person?.posterUrl" 
					:alt="props.person?.nameEn || props.person?.nameRu"
					class="person__image"
					loading="eager"
				/>
			</div>
			<div class="person__title">
				<a 
					:href="props.person?.webUrl" 
					target="_blank"
				>
					<h2>
						{{ props.person?.nameEn || props.person?.nameRu }}
					</h2>
				</a>
				<span>
					{{ props.person?.profession }}
				</span>
			</div>
		</div>
		<div class="person__filters">
			<RouletteSlider :items="filters">
				<template #slide="{ item }">
					<VButton
						:key="item.professionKey"
						@click="setFilter(item.professionKey)"
						:modificator="currentFilter === item.professionKey ? 'color-main' : 'color-gray'"
						size="normal"
						appearance="fill"
					>
						{{ professionMapping[item.professionKey] }}
					</VButton>
				</template>
			</RouletteSlider>
		</div>
		<div class="person__movies">
			<MovieLists 
				:movies="filteredFilms"
				:loading="props.loading"
				:resize="true"
			/>
		</div>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />