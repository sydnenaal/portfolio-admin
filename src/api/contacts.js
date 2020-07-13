import { queryWrapper } from "utils";
import { apiServices, serverPath } from "api";

export const setContactData = ({ title, data }) => {
  return queryWrapper({
    url: `${apiServices}/contacts/set`,
    method: "patch",
    body: { data },
    title: title,
    errorMessages: {
      500: { message: "Не удалось обновить данные", type: "danger" },
      200: { message: "Успешно обновлено", type: "success" },
    },
  });
};

export const getContactData = ({ title, cancelToken }) => {
  return queryWrapper({
    url: `${serverPath}/api/public/contacts/set`,
    method: "get",
    cancelToken: cancelToken,
    title: title,
    errorMessages: {
      500: { message: "Не удалось получить данные", type: "danger" },
    },
    successCallback: (dispatch, response) => {},
  });
};
