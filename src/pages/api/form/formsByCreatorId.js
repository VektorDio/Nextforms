import prisma from "@/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import isValidIdObject from "@/utils/utils";

export default async function handler(req, res) {
    if (req.method === 'GET'){
        const session = await getServerSession(req, res, authOptions)
        const { userId } = req.query

        if (!isValidIdObject(userId)) {
            return res.status(400).send({ message: "Malformed user ID."})
        }

        if (!session || session.user.id !== userId) {
            return res.status(401).send({ message: "You must be logged in." });
        }

        let forms
        try {
            forms = await prisma.form.findMany({
                where: {
                    userId: userId
                }
            })
        } catch (e) {
            console.log({...e, message: e})
            return res.status(500).send({ message: "Error occurred while retrieving forms."})
        }

        return res.status(200).send({forms})
    }
}