import prisma from "@/server";

export default async function handler(req, res) {
    if (req.method === 'GET'){
        const {query} = req
        const {id} = query
        const forms = await prisma.form.findMany({
            where: {
                userId: id
            },
            select: {
                id: true,
                name: true,
            },
        })
        res.send({forms})
    }
}