import prisma from "@/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import isValidIdObject from "@/utils/utils";
import * as Yup from "yup";

export default async function handler(req, res) {
    if (req.method === 'GET'){
        const session = await getServerSession(req, res, authOptions)
        const { userId, pageSize, currentPage, withNames } = req.query

        const flagSchema = Yup.boolean()
        const pageSizeSchema = Yup.number().max(100)
        const currentPageSchema = Yup.number().max(100)

        if (!flagSchema.isValidSync(withNames) ||
            !pageSizeSchema.isValidSync(pageSize) ||
            !currentPageSchema.isValidSync(currentPage)) {
            return res.status(400).send({ message: "Malformed data."})
        }

        if (!isValidIdObject(userId)) {
            return res.status(400).send({ message: "Malformed user ID."})
        }

        if (!session || session.user.id !== userId) {
            return res.status(401).send({ message: "You must be logged in." });
        }

        let forms
        let count

        try {
            forms = await prisma.form.findMany({
                take: parseInt(pageSize),
                skip: parseInt((currentPage - 1) * pageSize),
                where: {
                    userId: userId
                },
                select: (withNames) && {
                    id: true,
                    name: true,
                }
            })

            count = await prisma.form.count({
                where: {
                    userId: userId
                }
            })
        } catch (e) {
            console.log({...e, message: e})
            return res.status(500).send({ message: "Error occurred while retrieving forms."})
        }

        return res.status(200).send({forms, count})
    }
}