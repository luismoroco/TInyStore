import { transporter } from '../../config/mailer';

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
