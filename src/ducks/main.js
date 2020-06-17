import { setVisits, setNewMessagesCounter } from "redux/actions";
import { queryWrapper } from "utils";
import { serverPath } from "ducks";

export const getMainInfo = ({ cancelToken }) => {
  return queryWrapper({
    url: `${serverPath}/mainPage/info`,
    method: "get",
    cancelToken: cancelToken,
    errorMessages: {
      500: { message: "Не удалось загрузить данные", type: "danger" },
    },
    successCallback: (dispatch, response) => {
      dispatch(setNewMessagesCounter(response.data.counter));
      dispatch(setVisits(response.data.visits));
    },
  });
};