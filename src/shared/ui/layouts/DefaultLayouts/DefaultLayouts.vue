<script setup>
import {
    HeaderSection as Header,
} from '@/widgets/HeaderSection'
import {
    FooterSection as Footer,
} from '@/widgets/FooterSection'
</script>

<template>
	<Header />

	<main class="container">
		<slot />
	</main>
	
	<Footer />
</template>