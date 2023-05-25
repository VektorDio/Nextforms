import prisma from "@/server";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { body } = req
        const { data } = body
        const form = await prisma.answer.createMany({
            data: data,
        })

        res.status(200).send(form)
    } else if (req.method === 'GET'){
        const {query} = req
        const {id} = query

        let form
        if (id) {
            form = await prisma.form.findUnique({
                where: {
                    id: id
                },
                include: {
                    questions: {
                        include: {
                            answers: true
                        }
                    }
                }
            })
        }

        res.send(form?.questions.map(e => ({
            type: e.type,
            question: e.question,
            options: e.options,
            answers: e.answers.map(e => e.answerData),
        })))
    } else if(req.method === 'PATCH') {

    } else if (req.method === 'DELETE'){
        //?
        const {query} = req
        const {id} = query
        await prisma.answer.deleteMany({
            where: {
                id: id,
            },
        })
        res.status(200).send()
    }
}