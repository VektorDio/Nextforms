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
        const report = await prisma.report.create({
            data: {
                userId: userId,
                name: "New report",
                description: "Description",
                blocks: {
                    create: {
                        type: "oneLineText",
                        name: "",
                    }
                }
            },
        })

        res.status(200).send(report)
    } else if (req.method === 'GET'){
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
            res.status(401).json({ message: "You must be logged in." });
            return;
        }

        const {query} = req
        const {id} = query
        let report
        if (id){
            report = await prisma.report.findUnique({
                where: {
                    id: id
                },
                include: {
                    blocks: true
                }
            })
        }
        res.send({report})
    } else if(req.method === 'PATCH') {
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
            res.status(401).json({ message: "You must be logged in." });
            return;
        }

        const { body } = req
        const { id, description, name, blocks } = body

        let report

        if (blocks && blocks.length > 0){

            await prisma.block.deleteMany({
                where:{
                    reportId: id,
                }
            })

            report = await prisma.report.update({
                where: {
                    id: id,
                },
                data: {
                    description: description,
                    name: name,
                    blocks: {
                        createMany: {
                            data: blocks
                        }
                    },
                },
            })
        } else {
            report = await prisma.report.update({
                where: {
                    id: id,
                },
                data: {
                    description: description,
                    name: name,
                },
            })
        }
        res.status(200).send(report)
    } else if (req.method === 'DELETE'){
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
            res.status(401).json({ message: "You must be logged in." });
            return;
        }

        const {query} = req
        const {id} = query
        await prisma.report.delete({
            where: {
                id: id,
            },
        })
        res.status(200).send()
    }
}