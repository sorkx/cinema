const getEnvVariable = (key) => {
    if (import.meta.env[key] === undefined) {
        throw new Error(`Env variable ${key} is required`);
    }

    return import.meta.env[key]
} 

export const API_URL = getEnvVariable('VITE_API_URL')
export const API_URL_STAFF = getEnvVariable('VITE_API_URL_STAFF')
export const API_KEY = getEnvVariable('VITE_API_KEY')