import prisma from "@/server";
import {hashPassword} from "@/server/hash";
import {getServerSession} from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import isValidIdObject from "@/utils/utils";

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

async function postHandler(req, res) {
    const { email, password, organisation } = req.body
    const hashedPassword = hashPassword(password)
    let user
    try {
        const userToSearch = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (userToSearch) {
            return res.status(400).send({message: "This email is already taken"})
        }

        user = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                organisation: organisation
            },
        })
    } catch (e) {
        console.log({...e, message: e})
        return res.status(500).send({message: "Error occurred while creating user."})
    }

    return res.status(200).send({user})
}

async function getHandler(req, res, session) {
    const { userId } = req.query

    if (!isValidIdObject(userId)) {
        return res.status(400).send({ message: "Malformed user ID."})
    }

    if (!session || session.user.id !== userId) {
        return res.status(401).send({ message: "You must be logged in." })
    }

    let user
    try {
        user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
    } catch (e) {
        console.log({...e, message: e})
        return res.status(500).send({message: "Error occurred while retrieving user."})
    }

    return res.status(200).send({user})
}

async function patchHandler(req, res, session) {
    const { email, password, organisation, lastName, firstName, phoneNumber, id:userId } = req.body

    if (!isValidIdObject(userId)) {
        return res.status(400).send({ message: "Malformed user ID."})
    }

    if (!session || session.user.id !== userId) {
        return res.status(401).send({ message: "You must be logged in." });
    }

    let user
    try {
        user = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                email: email,
                password: password,
                organisation: organisation,
                lastName: lastName,
                phoneNumber: phoneNumber,
                firstName: firstName,
            },
        })
    } catch (e) {
        console.log({...e, message: e})
        return res.status(500).send({message: "Error occurred while updating user."})
    }

    return res.status(200).send({user})
}

async function deleteHandler(req, res, session) {
    const { userId } = req.query

    if (!isValidIdObject(userId)) {
        return res.status(400).send({ message: "Malformed user ID."})
    }

    if (!session || session.user.id !== userId) {
        res.status(401).send({ message: "You must be logged in." });
        return;
    }

    try {
        await prisma.user.delete({
            where: {
                id: userId,
            },
        })
    } catch (e) {
        console.log({...e, message: e})
        return res.status(500).send({message: "Error occurred while deleting user."})

    }

    return res.status(200).send({})
}