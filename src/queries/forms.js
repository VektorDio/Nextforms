import {useQuery} from "@tanstack/react-query";

export const useGetForms = (params) => {
    return useQuery({
        queryKey: ['forms'],
        queryFn: async () => {
            const { name } = params
            return fetch(`http://localhost:3000/api/user/compact?name=${name}`, {
                method: 'GET'
            }).then(res => res.json())
        }
    })
}