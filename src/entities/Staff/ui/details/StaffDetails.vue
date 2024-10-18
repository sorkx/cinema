<script setup>
import {
    Pathway,
} from '@/shared/ui/Pathway'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'
import {
    ModuleWrapper,
} from '@/shared/ui/ModuleWrapper'
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
		class="container actor"
	>
		<Pathway title="Актер" />
		<div class="actor__header">
			<div class="actor__image">
				<img 
					:src="props.person?.posterUrl" 
					:alt="props.person?.nameEn || props.person?.nameRu"
					class="actor__image"
					loading="eager"
				/>
			</div>
			<div class="actor__title">
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
		<div class="actor__filters">
			<ModuleWrapper
				:items="filters"
				swiper-type="genres"
			>
				<template #slide="{ item }">
					<ButtonFilter
						:key="item.professionKey"
						:title="professionMapping[item.professionKey]"
						:active="currentFilter === item.professionKey"
						@click="setFilter(item.professionKey)"
					/>
				</template>
			</ModuleWrapper>
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