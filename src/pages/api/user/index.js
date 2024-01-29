import prisma from "@/server";
import {hashPassword, validatePassword} from "@/server/hash";
import {getServerSession} from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]'
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

async function postHandler(req, res) {
    const { email, password } = req.body

    let user

    const emailSchema = Yup.string().email().max(40).required()
    const passwordSchema = Yup.string().min(8).max(150)
        .matches(/[^\s-]/)
        .matches(/^[A-Za-z][A-Za-z0-9]*$/)
        .matches(/[0-9]/)
        .matches(/[a-z]/)
        .matches(/[A-Z]/)

    if (!emailSchema.isValidSync(email) || !passwordSchema.isValidSync(password)) {
        return res.status(400).send({ message: "Malformed data."})
    }

    try {
        const userToSearch = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (userToSearch) {
            return res.status(400).send({message: "This email is already taken"})
        }

        const hashedPassword = hashPassword(password)

        user = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword
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
    const { email, password, newPassword, lastName, firstName, phoneNumber, id:userId } = req.body

    const phoneRegex = /^[\\+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4,6}$/

    const emailSchema = Yup.string().email().max(40)
    const lastNameSchema = Yup.string().max(30)
    const firstNameSchema = Yup.string().max(30)
    const phoneNumberSchema = Yup.string().matches(phoneRegex, { excludeEmptyString: true }).max(20).nullable(true)
    const passwordSchema = Yup.string().min(8).max(150)
        .matches(/[^\s-]/)
        .matches(/^[A-Za-z][A-Za-z0-9]*$/)
        .matches(/[0-9]/)
        .matches(/[a-z]/)
        .matches(/[A-Z]/)

    if (!emailSchema.isValidSync(email) ||
        !passwordSchema.isValidSync(newPassword) ||
        !lastNameSchema.isValidSync(lastName) ||
        !firstNameSchema.isValidSync(firstName) ||
        !phoneNumberSchema.isValidSync(phoneNumber)) {
        return res.status(400).send({ message: "Malformed data."})
    }

    if (!isValidIdObject(userId)) {
        return res.status(400).send({ message: "Malformed user ID."})
    }

    if (!session || session.user.id !== userId) {
        return res.status(401).send({ message: "You must be logged in." });
    }

    let hashedPassword
    if (newPassword) {
        let user
        try {
            user = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    password: true
                }
            })
        } catch (e) {
            console.log({...e, message: e})
            return res.status(500).send({message: "Error occurred while retrieving user."})
        }

        if (!validatePassword(password, user.password)) {
            return res.status(400).send({message: "Wrong password."})
        } else {
            hashedPassword = hashPassword(newPassword)
        }
    }

    let user
    try {
        user = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                email: email,
                password: hashedPassword,
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
    const { userId, email, password } = req.query

    if (!isValidIdObject(userId)) {
        return res.status(400).send({ message: "Malformed user ID."})
    }

    if (!session || session.user.id !== userId) {
        res.status(401).send({ message: "You must be logged in." });
        return;
    }

    let user

    try {
        user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                email: true,
                password: true,
                id: true
            }
        })
    } catch (e) {
        console.log({...e, message: e})
        return res.status(500).send({message: "Error occurred while retrieving user."})
    }

    if (user.email === email && validatePassword(password, user.password) && userId === user.id) {
        try {
            await prisma.user.delete({
                where: {
                    id: userId,
                }
            })
        } catch (e) {
            console.log({...e, message: e})
            return res.status(500).send({message: "Error occurred while deleting user."})
        }
        return res.status(200).send({})
    } else {
        return res.status(400).send({message: "Wrong credentials."})
    }
}