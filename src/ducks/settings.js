import { store } from "react-notifications-component";

import { serverPath, queryWrapper } from "ducks";
import { notificationSettings } from "constants/notificationSettings";
import { encryptData } from "utils";

export const changePassword = ({ password }) =>
  queryWrapper({
    method: "post",
    url: `${serverPath}/users/setPassword`,
    body: { data: encryptData(password) },
    errorMessage: "Не удалось сменить пароль",
    successCallback: () => {
      store.addNotification({
        ...notificationSettings,
        title: "Сброс",
        message: "Пароль успешно изменен",
        type: "success",
      });
    },
  });
