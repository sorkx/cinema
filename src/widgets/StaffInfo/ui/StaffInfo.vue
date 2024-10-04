<script setup>
import {
    StaffDetails,
    staffModel,
} from '@/entities/Staff'
import {
    storeToRefs,
} from 'pinia'
import {
    onBeforeMount,
    computed,
    ref,
} from 'vue'
import { 
    useRoute,
} from 'vue-router'

const route = useRoute()

const loading = ref(false)

const staffDetailsStore = staffModel()

const personId = computed(() => +route.params.id)

let { 
    person,
} = storeToRefs(staffDetailsStore)

const fetchStaffDetails = async (id) => {
    await staffDetailsStore.fetchCurrentPerson(id)
}

onBeforeMount(async () => {
    loading.value = true
    await fetchStaffDetails(personId.value)
    loading.value = false
})
</script>

<template>
	<StaffDetails 
		:person="person"
		:loading="loading"
	/>
</template>