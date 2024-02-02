import nodemailer from "nodemailer"

export async function sendMail(subject, toEmail, otpText) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: "nextformsNoreply@gmail.com",
            clientId: local_settings.my_oauth_client_id,
            clientSecret: local_settings.my_oauth_client_secret,
            refreshToken: local_settings.my_oauth_refresh_token,
            accessToken: local_settings.my_oauth_access_token
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