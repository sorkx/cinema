<script setup>
import   { 
    useMovieStore, 
} from '@/stores/movieStore'
import {
    storeToRefs,
} from 'pinia'
import {
    onMounted,
    watch,
} from 'vue'
import { 
    CardItem,
    MovieDetails,
} from '~/vue-app-components.js'

const movieStore = useMovieStore()
const { 
    cards, 
    isMovieDetailsOpen, 
    selectedMovie, 
} = storeToRefs(movieStore)

const fetchMovies = () => {
	movieStore.fetchData()
}

const opneDetails = () => {
	movieStore.openMovieDetails(id)
}

const closeDetails = () => {
    movieStore.closeMovieDetails()
}

onMounted(async () => {
    await fetchMovies()

    console.log('cards', cards.value)
})

watch(isMovieDetailsOpen, (newValue) => {
    if (newValue) {
        document.body.classList.add('overlay-open')
    } else {
        document.body.classList.remove('overlay-open')
    }
})
</script>

<template>
	<div class="card-lists">
		<template v-if="cards.length">
			<CardItem
				v-for="card in cards" 
				:key="card.kinopoiskId || card.imdbId"
				:src="card.posterUrlPreview"
				:name="card.nameRu || card.nameEn"
				:genre="card.genre"
				:rating="card.ratingKinopoisk || card.ratingImdb"
				@card-click="opneDetails(card.kinopoiskId || card.imdbId)" 
			/>
		</template>
		<div v-else>
			Loading...
		</div>
		<Transition name="fade">
   			 <div 
			 	v-show="isMovieDetailsOpen" 
				class="overlay"
			>
      			<Transition name="slide">
       				 <div 
					 	v-show="isMovieDetailsOpen" 
						class="movie-details-container"
					>
						<button 
							class="close-button" 
							@click="closeDetails"
						>
							&times;
						</button>
						<MovieDetails 
							v-if="selectedMovie" 
							:movie-details="selectedMovie" 
						/>
       				 </div>
      			</Transition>
   			 </div>
  		</Transition>
	</div>
</template>

<style src="./cardLists.scss" lang="scss" scoped />