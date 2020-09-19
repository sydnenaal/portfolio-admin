import { serverPath, apiServices } from "api";

export const checkAuth = {
  url: `${serverPath}/auth`,
  method: "post",
  errorMessages: {
    500: { message: "Неверный логин или пароль", type: "danger" },
  },
};

export const getUserData = {
  url: `${apiServices}/users/getUserData`,
  method: "get",
  errorMessages: {
    500: {
      message: "Не удалось загрузить данные текущего пользователя",
      type: "danger",
    },
  },
};
