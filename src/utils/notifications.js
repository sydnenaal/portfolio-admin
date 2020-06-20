import { notificationSettings } from "constants/notificationSettings";
import { store } from "react-notifications-component";

export const showNotifyByResponseStatusCode = (status, messages) => {
  const messageData = messages && status && messages[status];

  messageData &&
    store.addNotification({
      ...notificationSettings,
      title: messageData.type === "success" ? "Успех" : "Ошибка",
      message: messageData.message,
      type: messageData.type,
    });
};
