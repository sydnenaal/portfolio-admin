import axios from "axios";
import { store } from "react-notifications-component";

import { notificationSettings } from "constants/notificationSettings";
import { serverPath } from "./";
import { setAppState, setVisits, setNewMessagesCounter } from "redux/actions";

export const getMainInfo = ({ cancelToken }) => {
  return async (dispatch) => {
    dispatch(setAppState(true));

    try {
      const visitResponse = await axios.get(`${serverPath}/visits`, {
        cancelToken: cancelToken,
      });

      const counterResponse = await axios.get(`${serverPath}/newMessages`, {
        cancelToken: cancelToken,
      });

      counterResponse &&
        dispatch(setNewMessagesCounter(counterResponse.data.counter));
      visitResponse && dispatch(setVisits(visitResponse.data[0]));
    } catch (error) {
      console.log(error);
      store.addNotification({
        ...notificationSettings,
        title: "Ошибка",
        message: "Не удалось загрузить данные.",
        type: "danger",
      });
    }

    dispatch(setAppState(false));
  };
};
