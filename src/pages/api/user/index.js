import prisma from "@/server";
import {hashPassword} from "@/server/hash";
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { body } = req
        const { email, password, organisation} = body

        const hashedPassword = hashPassword(password)

        const user = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                organisation: organisation
            },
        })

        res.status(200).send(user)
    } else if (req.method === 'GET'){

    } else if(req.method === 'PATCH') {

        const { body } = req
        const { email, password, organisation, lastName, firstName, phoneNumber, id } = body

        const user = await prisma.user.update({
            where: {
                id: id,
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

        res.status(200).send(user)
    }
}