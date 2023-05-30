import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

export const useAddReport = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data) => {
            const addedReport = await axios.post('/api/report', data)
            await queryClient.invalidateQueries({ queryKey: ['reports'] })
            return addedReport
        }
    })
}
export const useGetReportById = (params) => {
    //const { enabled } = params
    return useQuery({
        queryKey: ['reports', params],
        queryFn: async () => {
            const { id } = params
            return (await axios.get('/api/report', {
                params: {
                    id: id,
                }
            })).data
        },
        //enabled: enabled
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
            await queryClient.invalidateQueries({ queryKey: ['reports'] })
            return deletedReport
        }
    })
}

export const useGetReportsByCreatorId = (params) => {
    //const { enabled } = params
    return useQuery({
        queryKey: ['reports', params],
        queryFn: async () => {
            const { id } = params
            return (await axios.get('/api/report/reportByCreatorId', {
                params: {
                    id: id,
                }
            })).data
        },
        //enabled: enabled
    })
}

export const useUpdateReport = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data) => {
            const updatedReport = await axios.patch('/api/report', data)
            await queryClient.invalidateQueries({ queryKey: ['reports'] })
            return updatedReport
        }
    })
}