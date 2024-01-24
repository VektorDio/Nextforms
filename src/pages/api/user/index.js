import prisma from "@/server";
import {hashPassword} from "@/server/hash";
import {getServerSession} from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]'
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
    const {email, password, organisation} = req.body
    const hashedPassword = hashPassword(password)
    let user
    try {
        const userToSearch = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (userToSearch) {
            res.status(500).send({message: "This email is already taken"})
            return
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
        res.status(500).send({message: "Error occurred while creating user."})
        return
    }

    res.status(200).send({user})
}

async function getHandler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    const {userId} = req.query

    if (!isValidIdObject(userId)) {
        return res.status(400).send({ message: "Malformed user ID."})
    }

    if (!session || session.user.id !== userId) {
        res.status(401).send({ message: "You must be logged in." })
        return
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
        res.status(500).send({message: "Error occurred while retrieving user."})
        return
    }

    res.status(200).send({user})
}

async function patchHandler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    const { email, password, organisation, lastName, firstName, phoneNumber, id:userId } = req.body

    if (!isValidIdObject(userId)) {
        return res.status(400).send({ message: "Malformed user ID."})
    }

    if (!session || session.user.id !== userId) {
        res.status(401).send({ message: "You must be logged in." });
        return;
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
        res.status(500).send({message: "Error occurred while updating user."})
        return
    }

    res.status(200).send({user})
}

async function deleteHandler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    const {userId} = req.query

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
        res.status(500).send({message: "Error occurred while deleting user."})
        return
    }

    res.status(200).send({})
}