import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";


export const useAddUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data) => {
            try {
                const addedUser = await axios.post('/api/user', data)
                await queryClient.invalidateQueries({ queryKey: ['users'] })
                return addedUser
            } catch (e) {
                throw e
            }
        }
    })
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data) => {
            const updatedUser = await axios.patch('/api/user', data)
            await queryClient.invalidateQueries({ queryKey: ['users'] })
            return updatedUser
        }
    })
}

export const useGetUserById = (params) => {
    return useQuery({
        queryKey: ['users', params],
        queryFn: async () => {
            const { id } = params
            return (await axios.get('/api/user', {
                params: {
                    id: id,
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
                    id: data.id
                }
            })
            await queryClient.invalidateQueries({ queryKey: ['users'] })
            return deletedUser
        }
    })
}

