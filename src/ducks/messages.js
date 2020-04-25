import axios from "axios";
import { NotificationManager } from "react-notifications";

import { serverPath } from "./";

export const getMessages = async () => {
  try {
    const response = await axios.get(`${serverPath}/messages`);

    return response.data;
  } catch (error) {
    NotificationManager.error("Не удалось загрузить сообщения");
  }
};
