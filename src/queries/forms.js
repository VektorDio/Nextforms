import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

export const useAddForm = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data) => {
            const addedForm = await axios.post('/api/form', data)
            await queryClient.invalidateQueries({ queryKey: ['GetFormById'] })
            await queryClient.invalidateQueries({ queryKey: ['GetFormsByCreatorId'] })
            await queryClient.invalidateQueries({ queryKey: ['GetFormNamesByCreatorId'] })
            return addedForm
        }
    })
}

export const useGetFormById = (params) => {
    return useQuery({
        queryKey: ['GetFormById', params],
        queryFn: async () => {
            const { formId } = params
            return (await axios.get('/api/form', {
                params: {
                    formId: formId,
                }
            })).data
        },
    })
}

export const useDeleteFormById = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data) => {
            const deletedForm = await axios.delete('/api/form', {
                params: {
                    formId: data.formId,
                    userId: data.userId
                }
            })
            await queryClient.invalidateQueries({ queryKey: ['GetFormById'] })
            await queryClient.invalidateQueries({ queryKey: ['GetFormsByCreatorId'] })
            await queryClient.invalidateQueries({ queryKey: ['GetFormNamesByCreatorId'] })
            return deletedForm
        }
    })
}

export const useGetFormsByCreatorId = (params) => {
    return useQuery({
        queryKey: ['GetFormsByCreatorId', params],
        queryFn: async () => {
            const { userId } = params
            return (await axios.get('/api/form/formsByCreatorId', {
                params: {
                    userId: userId,
                }
            })).data
        },
    })
}

export const useUpdateForm = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data) => {
            const updatedForm = await axios.patch('/api/form', data)
            await queryClient.invalidateQueries({ queryKey: ['GetFormById'] })
            await queryClient.invalidateQueries({ queryKey: ['GetFormsByCreatorId'] })
            await queryClient.invalidateQueries({ queryKey: ['GetFormNamesByCreatorId'] })
            return updatedForm
        }
    })
}

export const useCreateAnswers = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data) => {
            const createdAnswers = await axios.post('/api/form/answers', data)
            await queryClient.invalidateQueries({ queryKey: ['GetAnswersByFormId'] })
            return createdAnswers
        }
    })
}

export const useGetAnswersByFormId = (params) => {
    return useQuery({
        queryKey: ['GetAnswersByFormId', params],
        queryFn: async () => {
            const { formId, userId } = params
            return (await axios.get('/api/form/answers', {
                params: {
                    formId: formId,
                    userId: userId
                }
            })).data
        },
        enabled: false
    })
}

export const useGetFormNamesByCreatorId = (params) => {
    return useQuery({
        queryKey: ['GetFormNamesByCreatorId', params],
        queryFn: async () => {
            const { userId } = params
            return (await axios.get('/api/form/formsByCreatorId', {
                params: {
                    userId: userId,
                    withNames: true
                }
            })).data
        },
    })
}

