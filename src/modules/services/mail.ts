import { transporter } from '../../config/mailer';
import schedule from 'node-schedule';
import { mailInstance } from '../../utils/lib';

export const sendTheNotify = async (_to: string, info: string) => {
  const nodemon = transporter();
  await nodemon.sendMail({
    from: process.env.MAILER_SOURCE,
    to: _to,
    subject: `Tini Notify`,
    html: info,
  });
  console.log('SENT');
};

export const initSchedulerForMail = () => {
  schedule.scheduleJob('mailJob', '*/10 * * * * *', () => {
    sendTheMails();
  });
};

export const sendTheMails = async () => {
  const mailsForSend = await mailInstance.findMany();
  if (!mailsForSend || mailsForSend.length === 0) {
    console.log('empty');
    return;
  }

  console.log(mailsForSend);
  for (const item of mailsForSend) {
    sendTheNotify(item.recipient, item.body);

    await mailInstance.delete({
      where: {
        id: item.id,
      },
    });
  }
};
