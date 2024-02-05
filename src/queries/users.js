import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

export const useAddUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data) => {
            const addedUser = await axios.post('/api/user', data)
            await queryClient.invalidateQueries({ queryKey: ['GetUserById'] })
            return addedUser
        }
    })
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data) => {
            const updatedUser = await axios.patch('/api/user', data)
            await queryClient.invalidateQueries({ queryKey: ['GetUserById'] })
            return updatedUser
        }
    })
}

export const useGetUserById = (params) => {
    const { userId } = params
    return useQuery({
        queryKey: ['GetUserById', params],
        queryFn: async () => {
            return (await axios.get('/api/user', {
                params: {
                    userId: userId,
                }
            })).data
        },
        enabled: !!userId
    })
}

export const useResetPasswordRequest = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data) => {
            await axios.post('/api/user/passwordReset', data)
            await queryClient.invalidateQueries({ queryKey: ['GetUserById'] })
        }
    })
}

export const useResetPassword = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data) => {
            await axios.patch('/api/user/passwordReset', data)
            await queryClient.invalidateQueries({ queryKey: ['GetUserById'] })
        }
    })
}

export const useDeleteUserById = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data) => {
            const { userId, email, password } = data
            const deletedUser = await axios.delete('/api/user', { // sending delete with body for data encryption
                data: {
                    source: {
                        userId: userId,
                        email: email,
                        password: password
                    }
                }
            })
            await queryClient.invalidateQueries({ queryKey: ['GetUserById'] })
            return deletedUser
        }
    })
}

