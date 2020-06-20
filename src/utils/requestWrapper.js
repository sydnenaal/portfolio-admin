import axios from "axios";

import { selectLoading } from "redux/selectors";
import { setAppState } from "redux/actions";
import { showNotifyByResponseStatusCode } from "./notifications";

export const queryWrapper = ({
  successCallback,
  method,
  url,
  cancelToken,
  body,
  errorMessages,
}) => async (dispatch, getState) => {
  const isLoading = selectLoading(getState());
  if (!isLoading) {
    dispatch(setAppState(true));
    try {
      const token = localStorage.getItem("token") || "";
      const response = await axios({
        method: method,
        url: url,
        data: body,
        headers: { authToken: token },
        cancelToken: cancelToken,
      });

      successCallback && successCallback(dispatch, response);
      showNotifyByResponseStatusCode(response.status, errorMessages);
    } catch (error) {
      console.log({ ...error });
      if (error.isAxiosError) {
        const errorStatus = error.response && error.response.status;
        const errorMessage = errorMessages || {
          500: {
            message: "Не удалось завершить операцию",
            type: "danger",
          },
        };

        axios.isCancel(error)
          ? console.log("Отмена запроса")
          : showNotifyByResponseStatusCode(errorStatus, errorMessage);
      }
    }
    dispatch(setAppState(false));
  }
};
