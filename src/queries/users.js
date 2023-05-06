import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";

export const useAddUser = () => {
    return useMutation({
        mutationFn: async (data) => {
            return await axios.post('/api/user', data)
        }
    })
}

export const useUpdateUser = () => {
    return useMutation({
        mutationFn: async (data) => {
            return await axios.patch('/api/user', data)
        }
    })
}

export const useGetUserByEmail = (params) => {
    return useQuery({
        queryKey: ['forms', params],
        queryFn: async () => {
            const { email } = params
            return axios.get('http://localhost:3000/api/user/userEmail',{params:{
                    email:email,
                }})
        }
    })
}

