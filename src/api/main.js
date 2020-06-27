import { setVisits, setNewMessagesCounter } from "ducks";
import { queryWrapper } from "utils";
import { serverPath } from "api";

export const getMainInfo = ({ cancelToken, title }) => {
  return queryWrapper({
    url: `${serverPath}/mainPage/info`,
    method: "get",
    cancelToken: cancelToken,
    title: title,
    errorMessages: {
      500: { message: "Не удалось загрузить данные", type: "danger" },
    },
    successCallback: (dispatch, response) => {
      dispatch(setNewMessagesCounter(response.data.counter));
      dispatch(setVisits(response.data.visits));
    },
  });
};
