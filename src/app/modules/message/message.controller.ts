import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { MessageServices } from "./message.service";

const getMessage = catchAsync(async (req, res) => {
  const result = await MessageServices.getMessagesFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Messages retrieved successfully",
    data: result,
  });
});
const getMessageById = catchAsync(async (req, res) => {
  const result = await MessageServices.getMessageByIdFromDB(req.params.id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Message retrieved successfully",
    data: result,
  });
});
const sendMessage = catchAsync(async (req, res) => {
  const result = await MessageServices.sendMessageIntoDB(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Message send successfully",
    data: result,
  });
});

export const MessageControllers = {
  getMessage,
  getMessageById,
  sendMessage,
};
