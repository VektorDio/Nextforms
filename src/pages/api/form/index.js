import prisma from "@/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
            res.status(401).json({ message: "You must be logged in." });
            return;
        }

        const { body } = req
        const { userId } = body
        const form = await prisma.form.create({
            data: {
                userId: userId,
                active: false,
                name: "New form",
                description: "Description",
                questions: {
                    create: {
                        type: "radio",
                        question: "",
                    }
                }
            },
        })

        res.status(200).send(form)
    } else if (req.method === 'GET'){
        const {query} = req
        const {id} = query
        let form
        if (id){
            form = await prisma.form.findUnique({
                where: {
                    id: id
                },
                include: {
                    questions: true
                }
            })
        }
        res.send({form})
    } else if(req.method === 'PATCH') {
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
            res.status(401).json({ message: "You must be logged in." });
            return;
        }

        const { body } = req
        const { id, active, description, name, questions } = body

        let form

        if (questions && questions.length > 0){

            await prisma.question.deleteMany({
                where:{
                    formId: id,
                }
            })

            form = await prisma.form.update({
                where: {
                    id: id,
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
            form = await prisma.form.update({
                where: {
                    id: id,
                },
                data: {
                    active: active,
                    description: description,
                    name: name,
                },
            })
        }
        res.status(200).send(form)
    } else if (req.method === 'DELETE'){
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
            res.status(401).json({ message: "You must be logged in." });
            return;
        }

        const {query} = req
        const {id} = query
        await prisma.form.delete({
            where: {
                id: id,
            },
        })
        res.status(200).send()
    }
}