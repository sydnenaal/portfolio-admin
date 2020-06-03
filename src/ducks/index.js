import axios from "axios";
import { notificationSettings } from "constants/notificationSettings";
import { store } from "react-notifications-component";

import { selectLoading } from "redux/selectors";
import { setAppState } from "redux/actions";

export const serverPath = "http://localhost:9000";

export * from "./messages";
export * from "./projects";
export * from "./main";

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
      const response = await axios({
        method: method,
        url: url,
        data: body,
        params: { cancelToken },
      });

      response && successCallback(dispatch, response);
    } catch (error) {
      console.error(error);
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
