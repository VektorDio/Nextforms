import nodemailer from "nodemailer"

export async function sendMail(subject, toEmail, otpText) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: "nextformsNoreply@gmail.com",
            clientId: process.env.NODEMAILER_CLIENT_ID,
            clientSecret: process.env.NODEMAILER_CLIENT_SECRET,
            refreshToken: process.env.NODEMAILER_REFRESH_TOKEN,
            accessToken: process.env.NODEMAILER_ACCESS_TOKEN
        }
    });

    let mailOptions = {
        from: "nextformsNoreply@gmail.com",
        to: toEmail,
        subject: subject,
        text: otpText,
    };

    await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject(new Error(error, info))
            } else {
                console.log("Email Sent")
                resolve(true)
            }
        })
    })
}