import { notificationSettings } from "constants/notificationSettings";
import { store } from "react-notifications-component";

export const showNotifyByResponseStatusCode = (status, messages) => {
  const messageData = messages
    ? messages[status]
    : { message: "Не удалось завершить операцию", type: "danger" };

  store.addNotification({
    ...notificationSettings,
    title: messageData.type === "success" ? "Успех" : "Ошибка",
    message: messageData.message,
    type: messageData.type,
  });
};
