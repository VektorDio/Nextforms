import prisma from "@/server";
export default async function handler(req, res) {
    if (req.method === 'POST') {
    } else if (req.method === 'GET'){
        res.send({
            name: "test"
        })
    } else if(req.method === 'PATCH') {

    }
}