import { apiServices, serverPath } from "api";

export const setContactData = {
  url: `${apiServices}/contacts/set`,
  method: "patch",
  errorMessages: {
    500: { message: "Не удалось обновить данные", type: "danger" },
    200: { message: "Успешно обновлено", type: "success" },
  },
};

export const getContactData = {
  url: `${serverPath}/api/public/contacts`,
  method: "get",
  errorMessages: {
    500: { message: "Не удалось получить данные", type: "danger" },
  },
};
