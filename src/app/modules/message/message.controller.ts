import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { MessageServices } from "./message.service";

const sendMessage = catchAsync(async (req, res) => {
  const result = await MessageServices.sendMessageIntoDB(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Message send successfully!",
    data: result
  });
});

export const MessageControllers = {
    sendMessage
}