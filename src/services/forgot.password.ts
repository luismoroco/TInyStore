/**
 * Function for change password
 */

import { passTokenInstance, userInstance } from '../utils/lib';
import { sendTheNotify } from './mail';
import { generateToken } from './tokens';

export const passswordRecovery = async (
  id: number,
  email: string
): Promise<boolean> => {
  const token = generateToken(id, email);
  await passTokenInstance.create({
    data: { userId: id, token: token },
  });

  try {
    sendTheNotify(
      email,
      `<p>Hi!,</p>
      <p>This is the Token for recovery your password: <span style="color: red"><strong>${token}</strong></span></p>
      <p>Send your email, newpassword, and token in a JSON object to the following endpoint:</p>
      <p>method: PUT <span style="color: green"><strong>${process.env.LINK_RECOVERY}</strong></span></p>`
    );
    return true;
  } catch (error) {
    return false;
  }
};

export const updatePasswordRecovery = async (
  mail: string,
  pass: string
): Promise<boolean> => {
  const data = await userInstance.update({
    where: {
      email: mail,
    },
    data: {
      password: pass,
    },
  });

  try {
    sendTheNotify(
      mail,
      `<p>Hi!,</p>
      <p>Your NEW PASSWORD is password: <span style="color: red"><strong>${data.password}</strong></span></p>`
    );
    return true;
  } catch (error) {
    return false;
  }
};
