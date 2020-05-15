import axios from "axios";
import { NotificationManager } from "react-notifications";

import { serverPath } from "./";

export const getProjects = async ({ cancelToken }) => {
  try {
    const response = await axios.get(`${serverPath}/projects`, {
      cancelToken: cancelToken,
    });

    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Отмена запроса");
    } else {
      NotificationManager.error("Не удалось загрузить проекты");
    }
  }
};
