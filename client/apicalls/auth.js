import axiosInstance from './index'

export const loginUser = async (payload) => {
    const response = await axiosInstance.post('auth/login', payload)
    return response.data
}

export const registerUser = async (payload) => {
    const response = await axiosInstance.post('auth/register', payload)
    return response.data

}