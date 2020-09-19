import { notificationSettings } from "constants/notificationSettings";
import { store } from "react-notifications-component";

export function showNotifyByResponseStatusCode(status, messages) {
  const messageData = (() => {
    if (messages && status) {
      return messages[status];
    }
  })();

  if (messageData) {
    const { type, message } = messageData;
    const title = type === "success" ? "Успех" : "Ошибка";

    store.addNotification({ ...notificationSettings, title, message, type });
  }
}

export function helpUserNotify() {
  if (!localStorage.getItem("mailNotify")) {
    const message =
      "Воспользуйтесь меню быстрого доступа, кликнув по сообщению правой кнопкой мыши";
    const dismiss = { duration: 25000 };
    const params = { title: "Подсказка", type: "info", message, dismiss };

    localStorage.setItem("mailNotify", "showed");
    store.addNotification({ ...notificationSettings, ...params });
  }
}
