require('dotenv').config();



//Welcome Sending Email
//INstruction learn how -> go to -> ankurdotio.github.com 
// //  -> diffence-backend-video -> nodemailer


const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});


//

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Narendra Food" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


async function sendRegistrationemail(userEmail,name){
    const subject="welcome to narendra food service app"

    const text=`Hellow ${name}, \n
     \n Thankyou For Registration at Narendra Food Service
     App . We are exited to have you on Board !
      \n \n Best Regards , \n Narendra Food Service Team`

      const html=`<p>Hellow ${name},</p>
                  <p> Thankyou For Registration at Narendra Food Service
     App . We are exited to have you on Board !</p>

     <p> Best Regards 

     <br>
      Narendra Food Service Team

     </p>
      
      `


      //call send email

      await sendEmail(userEmail,subject,text,html)

      
}
module.exports = sendEmail;

// go to -> auth.controller.js -> registrationUser()
//   -> after res.status(201) 
// -> call sendRegistrationEmail Function with Peramiter
//also import emailService=email.service.js
/**
 * await emailService.sendRegistrationEmail(user.emai,user.name)  
 * */  
