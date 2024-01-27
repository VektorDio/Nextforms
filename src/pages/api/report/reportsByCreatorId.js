import prisma from "@/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import isValidIdObject from "@/utils/utils";
import * as Yup from "yup";

export default async function handler(req, res) {
    if (req.method === 'GET'){
        const session = await getServerSession(req, res, authOptions)
        const { userId, withNames } = req.query

        const flagSchema = Yup.boolean()

        if (!flagSchema.isValidSync(withNames)) {
            return res.status(400).send({ message: "Malformed data."})
        }

        if (!isValidIdObject(userId)) {
            return res.status(400).send({ message: "Malformed user ID."})
        }

        if (!session || session.user.id !== userId) {
            return res.status(401).send({ message: "You must be logged in." });
        }

        let reports
        try {
            reports = await prisma.report.findMany({
                where: {
                    userId: userId
                },
                select: (withNames) && {
                    id: true,
                    name: true,
                }
            })
        } catch (e) {
            console.log({...e, message: e})
            return res.status(500).send({message: "Error occurred while retrieving reports."})
        }

        return res.status(200).send({reports})
    }
}