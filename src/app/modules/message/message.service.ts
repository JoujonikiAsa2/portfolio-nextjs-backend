import { Message } from "./message.model";
import { TMessage } from "./message.interface";

const getMessagesFromDB = async () => {
  const result = await Message.find({});
  return result;
};

const getMessageByIdFromDB = async (id:string) => {
  const result = await Message.findById(id);
  return result;
};

const sendMessageIntoDB = async (payload:  TMessage ) => {
  await Message.create({...payload});
  return null;
};

export const MessageServices = {
  getMessagesFromDB,
  getMessageByIdFromDB,
  sendMessageIntoDB,
};
