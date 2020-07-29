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

export const helpUserNotify = () => {
  if (!localStorage.getItem("mailNotify")) {
    localStorage.setItem("mailNotify", "showed");
    store.addNotification({
      ...notificationSettings,
      title: "Подсказка",
      message:
        "Воспользуйтесь меню быстрого доступа, кликнув по сообщению правой кнопкой мыши",
      type: "info",
      dismiss: {
        duration: 25000,
      },
    });
  }
};
