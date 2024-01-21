import prisma from "@/server";
import {hashPassword} from "@/server/hash";
import {Prisma} from "@prisma/client";
import {getServerSession} from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { body } = req
        const { email, password, organisation} = body

        const hashedPassword = hashPassword(password)
        let user
        try {
            const userToSearch = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })

            if (userToSearch){
                res.status(500).send({message: "This email is already taken"})
            }

            user = await prisma.user.create({
                data: {
                    email: email,
                    password: hashedPassword,
                    organisation: organisation
                },
            })
        } catch (e) {
            let errorMessage
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (e.code === 'P2002') {
                    errorMessage = "This email is already taken"
                }
            }
            res.status(500).send({...e, message: errorMessage})
        }

        res.status(200).send(user)
    } else if (req.method === 'GET'){
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
            res.status(401).json({ message: "You must be logged in." });
            return;
        }

        const {query} = req
        const {id} = query
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })
        res.send({user})
    } else if(req.method === 'PATCH') {
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
            res.status(401).json({ message: "You must be logged in." });
            return;
        }

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
    } else if (req.method === 'DELETE'){
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
            res.status(401).json({ message: "You must be logged in." });
            return;
        }

        const {query} = req
        const {id} = query
        await prisma.user.delete({
            where: {
                id: id,
            },
        })
        res.status(200).send()
    }
}