import axios from "axios";
import { store } from "react-notifications-component";

import { notificationSettings } from "constants/notificationSettings";
import { serverPath } from "./";
import { setAppState, setMessages, setTabSortedMessages } from "redux/actions";
import { tabsNames, tabFilter } from "constants/messagesConstants";

export const getMessages = ({ cancelToken, successCallback }) => {
  return async (dispatch) => {
    dispatch(setAppState(false));

    try {
      const response = await axios.get(`${serverPath}/messages`, {
        cancelToken: cancelToken,
      });

      if (response) {
        successCallback(response);
        const responseWithChecked = response.map((item) => ({
          ...item,
          isChecked: false,
        }));

        dispatch(setMessages(responseWithChecked));

        const tabs = {};
        tabsNames.forEach((item) => {
          tabs[item] = responseWithChecked.filter(tabFilter[item]);
        });

        dispatch(setTabSortedMessages(tabs));

        successCallback(responseWithChecked);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Отмена запроса");
      } else {
        store.addNotification({
          ...notificationSettings,
          title: "Ошибка",
          message: "Не удалось загрузить сообщения",
          type: "danger",
        });
      }
    }

    dispatch(setAppState(false));
  };
};
