import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

export const useAddReport = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data) => {
            const addedReport = await axios.post('/api/report', data)
            await queryClient.invalidateQueries({ queryKey: ['GetReportById'] })
            return addedReport
        }
    })
}
export const useGetReportById = (params) => {
    return useQuery({
        queryKey: ['GetReportById', params],
        queryFn: async () => {
            const { id } = params
            return (await axios.get('/api/report', {
                params: {
                    id: id,
                }
            })).data
        },
    })
}

export const useGetReportsByCreatorId = (params) => {
    return useQuery({
        queryKey: ['GetReportsByCreatorId', params],
        queryFn: async () => {
            const { id } = params
            return (await axios.get('/api/report/reportByCreatorId', {
                params: {
                    id: id,
                }
            })).data
        },
    })
}

export const useDeleteReportById = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data) => {
            const deletedReport = await axios.delete('/api/report', {
                params: {
                    id: data.id
                }
            })
            await queryClient.invalidateQueries({ queryKey: ['GetReportById']})
            await queryClient.invalidateQueries({ queryKey: ['GetReportsByCreatorId']})
            return deletedReport
        }
    })
}

export const useUpdateReport = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data) => {
            const updatedReport = await axios.patch('/api/report', data)
            await queryClient.invalidateQueries({ queryKey: ['GetReportById'] })
            return updatedReport
        }
    })
}

export const useGetReportNamesByCreatorId = (params) => {
    return useQuery({
        queryKey: ['GetReportNamesByCreatorId', params],
        queryFn: async () => {
            const { id } = params
            return (await axios.get('/api/report/reportNamesByCreatorId', {
                params: {
                    id: id,
                }
            })).data
        },
    })
}