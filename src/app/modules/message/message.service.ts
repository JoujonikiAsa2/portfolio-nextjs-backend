import { Message } from "./message.model";
import { TMessage } from "./message.interface";

const sendMessageIntoDB = async (payload:  TMessage ) => {
  await Message.create({...payload});
  return null;
};

export const MessageServices = {
  sendMessageIntoDB,
};
