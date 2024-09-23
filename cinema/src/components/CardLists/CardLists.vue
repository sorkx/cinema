<script setup>
	import {
		onMounted,
		ref,
		watch,
	} from 'vue'
	import { 
		CardItem,
		MovieDetails,
	} from '~/vue-app-components.js'

	const cards = ref([])
	const selectedMovie = ref(null)
	const isMovieDetailsOpen = ref(false)

	const fetchData = async () => {
		const res = await fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films?type=FILM&page=1&order=RATING', {
			method: 'GET',
			headers: {
				'X-API-KEY': import.meta.env.VITE_API_KEY,
				'Content-Type': 'application/json',
			},
		})

		const { 
			items,
		} = await res.json()

		cards.value = items.map((item) => ({
			...item,
			genre: item.genres.map(genre => genre.genre).join(', ')
   		}))

	}

	const openMovieDetails = async (id) => {
		try {
			const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
			method: 'GET',
			headers: {
				'X-API-KEY': import.meta.env.VITE_API_KEY,
				'Content-Type': 'application/json',
			},
			})

			selectedMovie.value = await res.json()

			isMovieDetailsOpen.value = true

			console.log('selectedMovie.value', selectedMovie.value)
		} catch (error) {
			console.error('Error fetching movie details:', error)
		}
	}

	const closeMovieDetails = () => {
		isMovieDetailsOpen.value = false
		selectedMovie.value = null
	}


	onMounted(async () => {
		await fetchData()

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
				@card-click="openMovieDetails(card.kinopoiskId || card.imdbId)" 
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
							@click="closeMovieDetails"
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