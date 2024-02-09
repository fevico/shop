import nodeMailer from 'nodemailer';

export const passwordResetEmail = (token, email, name)=>{
    const html = `
    <html>
        <body>
            <h3>Dear ${name} </h3>
            <p>Plaease click on the link below to reset your password.</P>
            <a href="http://localhost:3000/password-reset/${token}">Click here!</a>
        </body>
    </html>
    `;

    const transport = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ajayifavour81@gmail.com',
            pass: 'lrot deeb jwjd zagq'
        }
    })

    const mailOptions = {
        from: 'penstore@gmail.com',
        to: email,
        subject: 'Pen store: Reset password request',
        html: html
    }

    transport.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error)
        }else{
            console.log(`Email send to ${email}`)
            console.log(info.response);
        }
    })
}
