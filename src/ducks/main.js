import { setVisits, setNewMessagesCounter } from "redux/actions";
import { queryWrapper, serverPath } from "ducks";

export const getMainInfo = ({ cancelToken }) => {
  return queryWrapper({
    url: `${serverPath}/mainPage/info`,
    method: "get",
    cancelToken: cancelToken,
    errorMessage: "Не удалось загрузить данные.",
    successCallback: (dispatch, response) => {
      dispatch(setNewMessagesCounter(response.data.counter));
      dispatch(setVisits(response.data.visits));
    },
  });
};
