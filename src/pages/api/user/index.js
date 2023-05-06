import prisma from "@/server";
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { body } = req
        const { email, password, organisation} = body

        const start = Date.now();
        const user = await prisma.user.create({
            data: {
                email,
                password,
                organisation
            },
        })
        const end = Date.now();
        console.log(`Execution time: ${end - start} ms`);
        res.status(200).send(user)
    } else if (req.method === 'GET'){

    } else if(req.method === 'PATCH') {
        const {body, query} = req
        console.log(req)
        const { firstName, lastName } = body
        res.send(query.id)
    }
}