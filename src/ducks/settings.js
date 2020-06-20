import { serverPath } from "ducks";
import { queryWrapper } from "utils";
import { encryptData } from "utils";

export const changePassword = ({ cancelToken, password, oldPassword, title }) =>
  queryWrapper({
    cancelToken: cancelToken,
    title: title,
    method: "post",
    url: `${serverPath}/users/setPassword`,
    body: {
      data: {
        password: encryptData(password),
        oldPassword: encryptData(oldPassword),
      },
    },
    errorMessages: {
      500: { message: "Не удалось сменить пароль", type: "danger" },
      505: { message: "Введен неверный старый пароль", type: "danger" },
      200: { message: "Пароль успешно изменен", type: "success" },
    },
  });
