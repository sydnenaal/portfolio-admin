import axios from "axios";
import { store } from "react-notifications-component";

import { notificationSettings } from "constants/notificationSettings";
import { serverPath } from "./";
import { dateParse } from "utils";
import { setAppState, setProjects } from "redux/actions";

export const getProjects = ({ cancelToken }) => {
  return async (dispatch) => {
    dispatch(setAppState(true));

    try {
      const response = await axios.get(`${serverPath}/projects`, {
        cancelToken: cancelToken,
      });

      if (response) {
        const responseWithChecked = response.data.map((item) => ({
          ...item,
          isChecked: false,
          createDate: dateParse(item.createDate),
        }));

        dispatch(setProjects(responseWithChecked));
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Отмена запроса");
      } else {
        store.addNotification({
          ...notificationSettings,
          title: "Ошибка",
          message: "Не удалось загрузить проекты",
          type: "danger",
        });
      }
    }

    dispatch(setAppState(false));
  };
};
