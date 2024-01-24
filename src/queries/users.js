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
    return useQuery({
        queryKey: ['GetUserById', params],
        queryFn: async () => {
            const { userId } = params
            return (await axios.get('/api/user', {
                params: {
                    userId: userId,
                }
            })).data
        }
    })
}

export const useDeleteUserById = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data) => {
            const deletedUser = await axios.delete('/api/user', {
                params: {
                    userId: data.userId
                }
            })
            await queryClient.invalidateQueries({ queryKey: ['GetUserById'] })
            return deletedUser
        }
    })
}

