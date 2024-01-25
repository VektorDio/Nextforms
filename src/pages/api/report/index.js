import prisma from "@/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import isValidIdObject from "@/server/utils";

const handlers = {
    GET: getHandler,
    POST: postHandler,
    PATCH: patchHandler,
    DELETE: deleteHandler,
}

export default async function handler(req, res) {
    handlers[req.method](req, res)
}

async function postHandler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    const { userId } = req.body

    if (!session || session.user.id !== userId) {
        return res.status(401).send({ message: "You must be logged in." });
    }

    if (!isValidIdObject(userId)) {
        return res.status(400).send({ message: "Malformed user ID."})
    }

    let report

    try {
        report = await prisma.report.create({
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
    } catch (e) {
        console.log({...e, message: e})
        return res.status(500).send({ message: "Error occurred while creating report."})
    }

    return res.status(200).send({report})
}

async function getHandler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    const {reportId, userId} = req.query

    if (!isValidIdObject(reportId)) {
        return res.status(400).send({ message: "Malformed report ID."})
    }

    if (!isValidIdObject(userId)) {
        return res.status(400).send({ message: "Malformed user ID."})
    }

    if (!session || session.user.id !== userId) {
        return res.status(401).send({ message: "You must be logged in." });
    }

    let report

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

    return res.status(200).send({report})
}

async function patchHandler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    const { id:reportId, description, name, blocks, userId } = req.body

    if (!isValidIdObject(reportId)) {
        return res.status(400).send({ message: "Malformed report ID."})
    }

    if (!isValidIdObject(userId)) {
        return res.status(400).send({ message: "Malformed user ID."})
    }

    if (!session || session.user.id !== userId) {
        return res.status(401).send({ message: "You must be logged in." });
    }

    try {
        if (blocks && blocks.length > 0) {
            await prisma.block.deleteMany({
                where: {
                    reportId: reportId,
                },
            })

            await prisma.report.update({
                where: {
                    id: reportId,
                },
                data: {
                    description: description,
                    name: name,
                    blocks: {
                        createMany: {
                            data: blocks
                        }
                    }
                },
            })
        } else {
            await prisma.report.update({
                where: {
                    id: reportId,
                },
                data: {
                    description: description,
                    name: name,
                },
            })
        }
    } catch (e) {
        console.log({...e, message: e})
        return res.status(500).send({message: "Error occurred while updating report."})
    }

    return res.status(200).send({})
}

async function deleteHandler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    const {reportId, userId} = req.query

    if (!isValidIdObject(reportId)) {
        return res.status(400).send({ message: "Malformed report ID."})
    }

    if (!isValidIdObject(userId)) {
        return res.status(400).send({ message: "Malformed user ID."})
    }

    if (!session || session.user.id !== userId) {
        return res.status(401).send({ message: "You must be logged in." });
    }

    try {
        await prisma.report.delete({
            where: {
                id: reportId,
            },
        })
    } catch (e) {
        console.log({...e, message: e})
        return res.status(500).send({message: "Error occurred while deleting report."})
    }

    return res.status(200).send({})
}