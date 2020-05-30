import axios from "axios";
import { store } from "react-notifications-component";

import { notificationSettings } from "constants/notificationSettings";
import { serverPath } from "./";

export const getMessages = async ({ cancelToken }) => {
  try {
    const response = await axios.get(`${serverPath}/messages`, {
      cancelToken: cancelToken,
    });

    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Отмена запроса");
    } else {
      store.addNotification({
        ...notificationSettings,
        title: "Ошибка",
        message: "Не удалось загрузить сообщения",
        type: "danger",
      });
    }
  }
};
