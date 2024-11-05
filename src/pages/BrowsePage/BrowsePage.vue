<script setup>
import {
    PopularSection,
} from '@/widgets/PopularSection'
import {
    GenresSection,
} from '@/widgets/GenresSection'
import {
    MoviesSection,
} from '@/widgets/MoviesSection'
import {
    SerialsSection,
} from '@/widgets/SerialsSection'
</script>

<template>
	<GenresSection 
		title="Каталог" 
		class="offset"
	/>
	<PopularSection />
	<MoviesSection />
	<SerialsSection />
</template>