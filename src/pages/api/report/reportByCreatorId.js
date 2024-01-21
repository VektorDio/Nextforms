import prisma from "@/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
    if (req.method === 'GET'){
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
            res.status(401).json({ message: "You must be logged in." });
            return;
        }

        const {query} = req
        const {id} = query
        const reports = await prisma.report.findMany({
            where: {
                userId: id
            }
        })
        res.send({reports})
    }
}