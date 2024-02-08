import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import isValidIdObject from "@/utils/isValidIdObject";
import prisma from "@/server";

export default async function handler(req, res) {
    if (req.method === 'GET'){
        const session = await getServerSession(req, res, authOptions)
        const { userId, formId, reportId } = req.query

        if (!session || session.user.id !== userId) {
            return res.status(401).send({ message: "You must be logged in." });
        }

        if (!isValidIdObject(userId)) {
            return res.status(400).send({ message: "Malformed user ID."})
        }

        let form,
            answers = null,
            report = null,
            formList = null,
            reportList = null

        if(isValidIdObject(formId)) {
            try {
                form = await prisma.form.findUnique({
                    where: {
                        id: formId
                    },
                    include: {
                        questions: {
                            include: {
                                answers: true
                            }
                        }
                    }
                })
            } catch (e) {
                console.log({...e, message: e})
                return res.status(500).send({message: "Error occurred while retrieving forms."})
            }
        }

        if (form) {
            let questions = form.questions.map(e => ({
                type: e.type,
                question: e.question,
                options: e.options,
                answers: e.answers.map(e => e.answerData) // reducing answer to just answerData
            }))
            answers = {userId: form.userId, questions: questions}
        }

        if (isValidIdObject(reportId)) {
            try {
                report = await prisma.report.findUnique({
                    where: {
                        id: reportId
                    },
                    include: {
                        blocks: true
                    }
                })
            } catch (e) {
                console.log({...e, message: e})
                return res.status(500).send({message: "Error occurred while retrieving report."})
            }
        }

        try {
            formList = await prisma.form.findMany({
                where: {
                    userId: userId
                },
                select: {
                    id: true,
                    name: true,
                }
            })
        } catch (e) {
            console.log({...e, message: e})
            return res.status(500).send({ message: "Error occurred while retrieving forms."})
        }

        try {
            reportList = await prisma.report.findMany({
                where: {
                    userId: userId
                },
                select: {
                    id: true,
                    name: true,
                }
            })
        } catch (e) {
            console.log({...e, message: e})
            return res.status(500).send({message: "Error occurred while retrieving reports."})
        }


        return res.status(200).send({answers, report, formList, reportList})
    }
}