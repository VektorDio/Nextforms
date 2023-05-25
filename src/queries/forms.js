import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

export const useAddForm = () => {
    return useMutation({
        mutationFn: async (data) => {
            return await axios.post('/api/form', data)
        }
    })
}
export const useGetFormById = (params) => {
    //const { enabled } = params
    return useQuery({
        queryKey: ['forms', params],
        queryFn: async () => {
            const { id } = params
            return (await axios.get('/api/form', {
                params: {
                    id: id,
                }
            })).data
        },
        //enabled: enabled
    })
}

export const useDeleteFormById = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data) => {
            const deletedForm = await axios.delete('/api/form', {
                params: {
                    id: data.id
                }
            })
            await queryClient.invalidateQueries({ queryKey: ['forms'] })
            return deletedForm
        }
    })
}

export const useGetFormsByCreatorId = (params) => {
    //const { enabled } = params
    return useQuery({
        queryKey: ['forms', params],
        queryFn: async () => {
            const { id } = params
            return (await axios.get('/api/form/formsByCreatorId', {
                params: {
                    id: id,
                }
            })).data
        },
        //enabled: enabled
    })
}

export const useUpdateForm = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data) => {
            const updatedUser = await axios.patch('/api/form', data)
            await queryClient.invalidateQueries({ queryKey: ['forms'] })
            return updatedUser
        }
    })
}