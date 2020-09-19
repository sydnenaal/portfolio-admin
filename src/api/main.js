import { apiServices } from "api";

export const getMainInfo = {
  url: `${apiServices}/mainPage/info`,
  method: "get",
  errorMessages: {
    500: { message: "Не удалось загрузить данные", type: "danger" },
  },
};
