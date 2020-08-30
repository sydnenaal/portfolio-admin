import { apiServices } from "api";
import { queryWrapper } from "utils";
import { encryptData } from "utils";

export const changePassword = ({ cancelToken, password, oldPassword, title }) =>
  queryWrapper({
    cancelToken: cancelToken,
    title: title,
    method: "post",
    url: `${apiServices}/users/setPassword`,
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

export const setUserName = ({ username, title }) =>
  queryWrapper({
    title: title,
    method: "post",
    url: `${apiServices}/users/setUsername`,
    body: { data: { username } },
    errorMessages: {
      500: { message: "Не удалось сменить имя", type: "danger" },
      200: { message: "Данные пользователя успешно изменены", type: "success" },
    },
  });

export const setUserPhoto = ({ photo, title }) =>
  queryWrapper({
    title: title,
    method: "post",
    url: `${apiServices}/users/setPhoto`,
    body: { data: { photo } },
    errorMessages: {
      500: { message: "Не удалось сменить фото", type: "danger" },
      200: { message: "Данные пользователя успешно изменены", type: "success" },
    },
  });
