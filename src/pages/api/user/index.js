import prisma from "@/server";
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { body } = req
        const { email, password, organisation} = body

        const user = await prisma.user.create({
            data: {
                email,
                password,
                organisation
            },
        })
        res.status(200).send(user)
    } else if (req.method === 'GET'){

    } else if(req.method === 'PATCH') {
        const { body } = req
        const { email, password, organisation } = body

        const user = await prisma.user.create({
            data: {
                email,
                password,
                organisation
            },
        })
        res.status(200).send(user)
    }
}