<script setup>
import {
    Pathway,
} from '@/shared/ui/Pathway'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'
import{
    ButtonFilter,
} from '@/shared/ui/buttons'
import {
    MovieLists,
} from '@/widgets/Movie/MovieLists'
import {
    SpinnerLoader,
} from '@/shared/ui/loaders'
import {
    computed,
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

const currentFilter = ref('ALL')

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
    if (currentFilter.value === 'ALL') {
        return props.person.films
    }
    return props.person.films.filter(film => film.professionKey === currentFilter.value)
})

</script>

<template>
	<SpinnerLoader v-if="props.loading" />

	<div 
		v-else
		class="container actor"
	>
		<Pathway title="Актер" />
		<div class="actor__header">
			<div class="actor__image">
				<div class="person">
					<UISymbol name="person" />
					<div class="person__overlay">
						<img 
							:src="props.person?.posterUrl" 
							:alt="props.person?.nameEn || props.person?.nameRu"
							class="person__image"
						/>
					</div>
				</div>	
			</div>
			<div class="actor__title">
				<a 
					:href="props.person?.webUrl" 
					target="_blank"
				>
					<div class="actor__name">
						{{ props.person?.nameEn || props.person?.nameRu }}
					</div>
				</a>
				<div class="actor__subtitle">
					{{ props.person?.profession }}
				</div>
			</div>
		</div>
		<div class="actor__filter">
			<ButtonFilter
				title="Всё"
				:active="currentFilter === 'ALL'"
				@click="setFilter('ALL')"
     		 />
			<ButtonFilter
				v-for="filter in filters"
				:key="filter.professionKey"
				:title="professionMapping[filter.professionKey]"
				:active="currentFilter === filter.professionKey"
				:itemLength="filter.count"
				@click="setFilter(filter.professionKey)"
			/>
		</div>
		<div class="actor__body">
			<MovieLists 
				:movies="filteredFilms"
				:loading="props.loading"
			/>
		</div>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />