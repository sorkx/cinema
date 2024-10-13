import { 
    API_KEY,
} from '@/shared/api/config'

export const fetchInstance = async (u, path = '', params = {}) => {
    const url = new URL(`${u}${path}`)

    Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
            url.searchParams.append(key, params[key])
        }
    })

    try {
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'X-API-KEY': API_KEY,
                'Content-Type': 'application/json',
            },
        })

        if (response.status === 402) {
            throw new Error('Payment Required (превышено количество бесплатных запросов)')
        }

        if (!response.ok) {
            throw new Error(`Ошибка при запросе: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()

        return data
    } catch (error) {
        console.error('Fetch Error:', error)
        throw error
    }
}