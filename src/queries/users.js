import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";


export const useAddUser = () => {
    return useMutation({
        mutationFn: async (data) => {
            try {
                return await axios.post('/api/user', data)
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

