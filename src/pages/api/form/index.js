import prisma from "@/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import isValidIdObject from "@/utils/utils";
import * as Yup from "yup";

const handlers = {
    GET: getHandler,
    POST: postHandler,
    PATCH: patchHandler,
    DELETE: deleteHandler,
}

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    handlers[req.method](req, res, session)
}

async function postHandler(req, res, session) {
    const { userId } = req.body

    if (!isValidIdObject(userId)) {
        return res.status(400).send({ message: "Malformed user ID."})
    }

    if (!session || session.user.id !== userId) {
        res.status(401).send({ message: "You must be logged in." });
        return;
    }

    let form

    try {
        form = await prisma.form.create({
            data: {
                userId: userId,
                active: false,
                name: "New form",
                description: "Description",
                questions: {
                    create: {
                        type: "radio",
                        question: "",
                        options: ["Option"]
                    }
                }
            },
        })
    } catch (e) {
        console.log({...e, message: e})
        return res.status(500).send({ message: "Error occurred while creating forms."})
    }

    return res.status(200).send({form})
}

async function getHandler(req, res) {
    const { formId } = req.query

    if (!isValidIdObject(formId)) {
        return res.status(400).send({ message: "Malformed form ID."})
    }

    let form

    try {
        form = await prisma.form.findUnique({
            where: {
                id: formId
            },
            include: {
                questions: true,
            }
        })
    } catch (e) {
        console.log({...e, message: e})
        return res.status(500).send({message: "Error occurred while retrieving forms."})
    }

    return res.status(200).send({form})
}

async function patchHandler(req, res, session) {
    const { userId, id:formId, active, description, name, questions } = req.body

    const activeSchema = Yup.boolean().required()
    const descriptionSchema = Yup.string().max(350).ensure()
    const nameSchema = Yup.string().max(80).ensure()
    const questionsSchema = Yup.array().of(Yup.object({
        type: Yup.string().required(),
        required: Yup.boolean().required(),
        question: Yup.string().min(1).max(120).required(),
        options: Yup.array().required()
    }))

    if (!activeSchema.isValidSync(active) ||
        !descriptionSchema.isValidSync(description) ||
        !nameSchema.isValidSync(name) ||
        !questionsSchema.isValidSync(questions)) {
        return res.status(400).send({ message: "Malformed data."})
    }

    if (!isValidIdObject(formId)) {
        return res.status(400).send({ message: "Malformed form ID."})
    }

    if (!isValidIdObject(userId)) {
        return res.status(400).send({ message: "Malformed user ID."})
    }

    if (!session || session.user.id !== userId) {
        return res.status(401).send({ message: "You must be logged in." });
    }

    try {
        if (questions && questions.length > 0) {
            await prisma.question.deleteMany({
                where: {
                    formId: formId,
                },
            })
            await prisma.form.update({
                where: {
                    id: formId,
                },
                data: {
                    active: active,
                    description: description,
                    name: name,
                    questions: {
                        createMany: {
                            data: questions
                        }
                    },
                },
            })
        } else {
            await prisma.form.update({
                where: {
                    id: formId,
                },
                data: {
                    active: active,
                    description: description,
                    name: name,
                },
            })
        }
    } catch (e) {
        console.log({...e, message: e})
        return res.status(500).send({message: "Error occurred while updating forms."})
    }

    return res.status(200).send({})
}

async function deleteHandler(req, res, session) {
    const { formId, userId } = req.query

    if (!isValidIdObject(formId)) {
        return res.status(400).send({ message: "Malformed form ID."})
    }

    if (!isValidIdObject(userId)) {
        return res.status(400).send({ message: "Malformed user ID."})
    }

    if (!session || session.user.id !== userId) {
        return res.status(401).send({ message: "You must be logged in." });
    }

    try {
        await prisma.form.delete({
            where: {
                id: formId,
            },
        })
    } catch (e) {
        console.log({...e, message: e})
        return res.status(500).send({message: "Error occurred while deleting form."})
    }

    return res.status(200).send({})
}
