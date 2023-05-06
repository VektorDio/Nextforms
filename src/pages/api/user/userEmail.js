import prisma from "@/server";

export default async function handler(req, res) {
    if (req.method === 'POST') {
    } else if (req.method === 'GET'){
        const { query } = req
        const { email } = query
        const user = await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        res.send({user})
    } else if(req.method === 'PATCH') {}
}