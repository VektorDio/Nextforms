import * as Yup from "yup";
import prisma from "@/server";
import {sendPasswordResetMail} from "@/server/nodemailer";
import jwt from "jsonwebtoken";
import {hashPassword} from "@/server/hash";

const handlers = {
    POST: postHandler,
    PATCH: patchHandler
}

export default async function handler(req, res) {
    handlers[req.method](req, res)
}

async function postHandler(req, res) {
    const { email, secondaryEmail, firstName, lastName } = req.body

    const emailSchema = Yup.string().email().max(40).required()
    const secondaryEmailSchema = Yup.string().email().max(40)
    const nameSchema = Yup.string().max(30)

    if (!emailSchema.isValidSync(email) ||
        !secondaryEmailSchema.isValidSync(secondaryEmail) ||
        !nameSchema.isValidSync(lastName) ||
        !nameSchema.isValidSync(firstName)) {
        return res.status(400).send({ message: "Malformed data."})
    }

    let user
    try {
        user = await prisma.user.findUnique({
            where: {
                email: email
            },
            select: {
                firstName: true,
                lastName: true,
                secondaryEmail: true,
                password: true
            }
        })
    } catch (e) {
        console.log({...e, message: e})
        return res.status(500).send({message: "Error occurred while retrieving user."})
    }

    if (user.length === 0) {
        return res.status(400).send({message: "No such user."})
    }

    if ((firstName && firstName !== user.firstName) ||
        (lastName && lastName !== user.lastName) ||
        (secondaryEmail && secondaryEmail !== user.secondaryEmail)){
        return res.status(400).send({message: "No such user."})
    }

    const resetToken = jwt.sign({ email: email }, user.password, { expiresIn: '30min' })

    await sendPasswordResetMail(user.email, user.firstName || "User", resetToken)

    return res.status(200).send({})
}

async function patchHandler(req, res) {
    const { newPassword, newPasswordConfirm, token } = req.body

    let decodedPayload = jwt.decode(token)

    if (decodedPayload === null) {
        return res.status(400).send({ message: "Malformed token."})
    }

    let userEmail = decodedPayload.email
    let userPassword

    try {
        userPassword = (await prisma.user.findUnique({
            where: {
                email: userEmail
            },
            select: {
                password: true
            }
        })).password
    } catch (e) {
        console.log({...e, message: e})
        return res.status(500).send({message: "Error occurred while retrieving user."})
    }

    jwt.verify(token, userPassword, function(err) {
        if (err) {
            console.log({err})
            return res.status(400).send({ message: "Invalid token."})
        }
    });

    const passwordSchema = Yup.string()
        .matches(/[^\s-]/, "No whitespaces allowed")
        .matches(/^[A-Za-z][A-Za-z0-9]*$/, "Only english letters allowed")
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .min(8, 'Password must be 8 characters long')
        .max(150, "Password is too long")
        .required('Required')

    if (!passwordSchema.isValidSync(newPassword) || newPassword !== newPasswordConfirm) {
        return res.status(400).send({ message: "Malformed data."})
    }

    try {
        await prisma.user.update({
            where: {
                email: userEmail,
            },
            data: {
                password: hashPassword(newPassword),
            },
        })
    } catch (e) {
        console.log({...e, message: e})
        return res.status(500).send({message: "Error occurred while updating user."})
    }

    return res.status(200).send({})
}
