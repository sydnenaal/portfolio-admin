import { apiServices } from "api";

export const changePassword = {
  method: "post",
  url: `${apiServices}/users/setPassword`,
  errorMessages: {
    500: { message: "Не удалось сменить пароль", type: "danger" },
    505: { message: "Введен неверный старый пароль", type: "danger" },
    200: { message: "Пароль успешно изменен", type: "success" },
  },
};

export const setUserName = {
  method: "post",
  url: `${apiServices}/users/setUsername`,
  errorMessages: {
    500: { message: "Не удалось сменить имя", type: "danger" },
    200: { message: "Данные пользователя успешно изменены", type: "success" },
  },
};

export const setUserPhoto = {
  method: "post",
  url: `${apiServices}/users/setPhoto`,
  body: { data: { photo } },
  errorMessages: {
    500: { message: "Не удалось сменить фото", type: "danger" },
    200: { message: "Данные пользователя успешно изменены", type: "success" },
  },
};
