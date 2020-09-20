import { apiServices } from "api";

export const setActualityMessages = {
  url: `${apiServices}/messages/actuality`,
  method: "post",
};

export const setPriorityMessages = {
  url: `${apiServices}/messages/priority`,
  method: "post",
};

export const getMessage = {
  url: `${apiServices}/messages/message`,
  method: "post",
  errorMessages: {
    500: { message: "Не удалось загрузить сообщение", type: "danger" },
  },
};

export const getMessages = {
  url: `${apiServices}/messages`,
  method: "get",
  errorMessages: {
    500: { message: "Не удалось загрузить сообщения", type: "danger" },
  },
};
