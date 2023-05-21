import prisma from "@/server";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const {query} = req
        const {id} = query
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })
        res.send({user})
    }
}