import axios from "axios";
import { notificationSettings } from "constants/notificationSettings";
import { store } from "react-notifications-component";

import { selectLoading } from "redux/selectors";
import { setAppState } from "redux/actions";

export const serverPath = "http://localhost:9000";

export * from "./messages";
export * from "./projects";
export * from "./main";
export * from "./settings";
export * from "./auth";

export const queryWrapper = ({
  successCallback,
  method,
  errorMessage,
  url,
  cancelToken,
  body,
}) => async (dispatch, getState) => {
  const isLoading = selectLoading(getState());
  if (!isLoading) {
    dispatch(setAppState(true));
    try {
      const token = localStorage.getItem("token");
      const response = await axios({
        method: method,
        url: url,
        data: body,
        headers: { authToken: token || "" },
        cancelToken: cancelToken,
      });

      successCallback && successCallback(dispatch, response);
    } catch (error) {
      console.log(error);
      axios.isCancel(error)
        ? console.log("Отмена запроса")
        : store.addNotification({
            ...notificationSettings,
            title: "Ошибка",
            message: errorMessage,
            type: "danger",
          });
    }
    dispatch(setAppState(false));
  }
};
