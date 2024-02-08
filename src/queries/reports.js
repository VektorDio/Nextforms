import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

export const useAddReport = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data) => {
            const addedReport = await axios.post('/api/report', data)
            await queryClient.invalidateQueries({ queryKey: ['GetReportById'] })
            await queryClient.invalidateQueries({ queryKey: ['GetReportsByCreatorId']})
            await queryClient.invalidateQueries({ queryKey: ['GetReportNamesByCreatorId']})
            return addedReport
        }
    })
}

export const useGetReportById = (params) => {
    const { reportId, userId } = params

    return useQuery({
        queryKey: ['GetReportById', params],
        queryFn: async () => {
            return (await axios.get('/api/report', {
                params: {
                    reportId: reportId,
                    userId: userId
                }
            })).data
        },
        enabled: !!reportId
    })
}

export const useGetReportsByCreatorId = (params) => {
    return useQuery({
        queryKey: ['GetReportsByCreatorId', params],
        queryFn: async () => {
            const { userId, pageSize, currentPage } = params
            return (await axios.get('/api/report/reportsByCreatorId', {
                params: {
                    userId: userId,
                    pageSize: pageSize,
                    currentPage: currentPage
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
                    reportId: data.reportId,
                    userId: data.userId
                }
            })
            await queryClient.invalidateQueries({ queryKey: ['GetReportById'] })
            await queryClient.invalidateQueries({ queryKey: ['GetReportsByCreatorId']})
            await queryClient.invalidateQueries({ queryKey: ['GetReportNamesByCreatorId']})
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
            await queryClient.invalidateQueries({ queryKey: ['GetReportsByCreatorId']})
            await queryClient.invalidateQueries({ queryKey: ['GetReportNamesByCreatorId']})
            return updatedReport
        }
    })
}

export const useGetReportNamesByCreatorId = (params) => {
    return useQuery({
        queryKey: ['GetReportNamesByCreatorId', params],
        queryFn: async () => {
            const { userId } = params
            return (await axios.get('/api/report/reportsByCreatorId', {
                params: {
                    userId: userId,
                    withNames: true
                }
            })).data
        },
    })
}