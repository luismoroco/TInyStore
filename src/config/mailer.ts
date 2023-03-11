import nodemailer from 'nodemailer';

export const transporter = () => {
  return nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: 2525,
    secure: false,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS,
    },
  });
};

export const sendTheNotify = async (
  _to: string /*, info: [string, number]*/
) => {
  const nodemon = transporter();
  await nodemon.sendMail({
    from: process.env.MAILER_SOURCE,
    to: _to,
    subject: `Tini Notify`,
    html: `<b>Hello from tinyStore<b>`,
  });
  console.log('SENT');
};
