import { setMessages, setTabSortedMessages } from "redux/actions";
import { tabsNames, tabFilter } from "constants/messagesConstants";
import { queryWrapper, serverPath } from "ducks";

export const getMessages = ({ cancelToken, successCallbackFromUI }) => {
  return queryWrapper({
    cancelToken: cancelToken,
    url: `${serverPath}/messages`,
    method: "get",
    errorMessage: "Не удалось загрузить сообщения",
    successCallback: (dispatch, response) => {
      const responseWithChecked = response.data.map((item) => ({
        ...item,
        isChecked: false,
      }));

      dispatch(setMessages(responseWithChecked));

      const tabs = {};
      tabsNames.forEach((item) => {
        tabs[item] = responseWithChecked.filter(tabFilter[item]);
      });

      dispatch(setTabSortedMessages(tabs));

      successCallbackFromUI(responseWithChecked);
    },
  });
};
