const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'modimalshop@gmail.com', // Your Gmail account
        pass: 'pktocncokaxsutos' // Your Gmail password
    }
});

export function sendEmailVerify(email: string, code: number) {
    let mailOptions = {
        from: 'Hotel Booking :)', // sender address
        to: email, // list of receivers
        subject: 'Verify Email Address.', // S   ubject line
        // text: 'Hello world?', // plain text body
        html: `
        <div style=" margin: auto; color: white;background-color:#f8738c;padding:20px;border-radius:10px">
            <h1 style="color: white;">Please Verify Your Email Address</h1>
            ${email
                ? `  <p style="color: white;">Hello ${email
                }</p> `
                : ""
            }
            <p style="color: white;">Thank you for signing up for our service. To complete your registration, please verify code into your profile </p>
            <div  style="background-color: #de3151; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;border-radius:10px">Verify code : ${code}</div>
            <p style="color: white;">If you did not sign up for our service, please ignore this email.</p>
            <p style="color: white;">Thank you,</p>
            <p style="color: white;">HotelBooking</p>
        </div>
        ` // html body
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error: string, info: { messageId: string }) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}
