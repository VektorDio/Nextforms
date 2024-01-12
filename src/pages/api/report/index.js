import prisma from "@/server";

export default async function handler(req, res) {
    if (req.method === 'POST') {
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