import { 
    defineStore, 
} from 'pinia'
import {
    ref,
} from 'vue'
import {
    ApiStaff,
} from '../api'

export const useStaffStore = defineStore('staff', () => {
    const staff = ref([])
    const person = ref([])

    const fetchStaff = async (filmId) => {
        const data = await ApiStaff.getAllStaff(filmId)
        staff.value = data
	
        console.log('staff', staff.value)
    }

    const fetchCurrentPerson = async (id) => {
        const data = await ApiStaff.getPerson(id)
        person.value = data
	
        console.log('person.value', person.value)
    }

    return {
        staff,
        person,
        fetchStaff,
        fetchCurrentPerson,
    }
})