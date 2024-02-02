import * as Yup from "yup";
import prisma from "@/server";
import {sendMail} from "@/utils/nodemailer";


export default async function handler(req, res) {
    if (req.method === 'POST'){
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
            user = await prisma.user.findMany({
                where: {
                    email: email
                },
                select: {
                    firstName: true,
                    lastName: true,
                    secondaryEmail: true
                }
            })
        } catch (e) {
            console.log({...e, message: e})
            return res.status(500).send({message: "Error occurred while retrieving user."})
        }

        if (user.length === 0) {
            return res.status(400).send({message: "No such user."})
        }

        if ((firstName && firstName !== user[0].firstName) ||
            (lastName && lastName !== user[0].lastName) ||
            (secondaryEmail && secondaryEmail !== user[0].secondaryEmail)){
            return res.status(400).send({message: "No such user."})
        }

        await sendMail("Success", "vektordiod@gmail.com", 'YES')

        return res.status(200).send({})
    }
}
