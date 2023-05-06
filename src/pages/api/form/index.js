import prisma from "@/server";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { body } = req
        const { userId, active, name, description, questions} = body
        const form = await prisma.form.create({
            data: {
                userId, active, name, description, questions
            },
        })
        console.log(form)
        res.status(200).send(form)
    } else if (req.method === 'GET'){
    } else if(req.method === 'PATCH') {
    }
}