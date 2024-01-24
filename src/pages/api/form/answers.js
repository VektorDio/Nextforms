import prisma from "@/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import isValidIdObject from "@/server/utils";

const handlers = {
    GET: getHandler,
    POST: postHandler,
    DELETE: deleteHandler,
}

export default async function handler(req, res) {
    handlers[req.method](req, res)
}

async function postHandler(req, res) {
    const { data } = req.body
    let form

    try {
        form = await prisma.answer.createMany({
            data: data, //should validate this data
        })
    } catch (e) {
        console.log({...e, message: e})
        return res.status(500).send({message: "Error occurred while creating new answers."})
    }

    return res.status(200).send({form})
}

async function getHandler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    const {formId, userId} = req.query

    if (!isValidIdObject(formId)) {
        return res.status(400).send({ message: "Malformed form ID." });
    }

    if (!isValidIdObject(userId)) {
        return res.status(400).send({ message: "Malformed user ID." });
    }

    if (!session || session.user.id !== userId) {
        return res.status(401).send({ message: "You must be logged in." });
    }

    let form

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

    if (form) {
        let questions = form.questions.map(e => ({
            type: e.type,
            question: e.question,
            options: e.options,
            answers: e.answers.map(e => e.answerData) // reducing answer to just answerData
        }))
        return res.status(200).send({userId: form.userId, questions: questions})
    } else {
        return res.status(200).send({})
    }
}

async function deleteHandler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    const { formId, userId } = req.query

    if (!isValidIdObject(formId)) {
        return res.status(400).send({ message: "Malformed form ID." });
    }

    if (!isValidIdObject(userId)) {
        return res.status(400).send({ message: "Malformed user ID." });
    }

    if (!session || session.user.id !== userId) {
        return res.status(401).send({ message: "You must be logged in." });
    }

    try {
        await prisma.answer.deleteMany({
            where: {
                formId: formId,
            },
        })
    } catch (e) {
        console.log({...e, message: e})
        return res.status(500).send({message: "Error occurred while deleting answers."})
    }

    return res.status(200).send()
}