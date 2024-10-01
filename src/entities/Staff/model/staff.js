import { 
    defineStore, 
} from 'pinia'
import {
    ref,
} from 'vue'

export const useStaffStore = defineStore('staff', () => {
    const staff = ref([])
    const person = ref([])

    const fetchStaff = async (filmId) => {
        try {
            const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${filmId}`, {
                method: 'GET',
                headers: {
                    'X-API-KEY': import.meta.env.VITE_API_KEY,
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json()
	
            staff.value = data
	
            console.log('staff', staff.value)
        } catch(e) {
            console.log('Ошибка получения персонала', e)
        }
    }

    const fetchCurrentPerson = async (id) => {
        try {
            const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v1/staff/${id}`, {
                method: 'GET',
                headers: {
                    'X-API-KEY': import.meta.env.VITE_API_KEY,
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json()
            person.value = data
	
            console.log('person.value', person.value)
        }catch(e) {
            console.log('Ошибка получения персоны', e)
        }
    }

    return {
        staff,
        person,
        fetchStaff,
        fetchCurrentPerson,
    }
})