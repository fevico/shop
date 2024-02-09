import nodeMailer from 'nodemailer';

// lrot deeb jwjd zagq
 
export const sendVerificationEmail = (token, email, name) => {
	const html = `
    <html>
        <body>
            <h3>Dear ${name}</h3>
            <p>Thanks for signing up at Pen Store!</p>
            <p>Use the link below to verify your email</p>
            <a href="http://localhost:3000/email-verify/${token}">Click here!</a>
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
        subject: 'Verification email',
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