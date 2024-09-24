<script setup>
import { 
    Header, 
    Footer, 
} from '~/vue-app-components.js'
</script>

<template>
	<Header />

	<slot />
	
	<Footer />
</template>