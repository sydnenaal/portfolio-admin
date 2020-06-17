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
      showNotifyByResponseStatusCode(errorMessages, response.status);
    } catch (error) {
      console.log({ ...error });
      if (error.isAxiosError) {
        const errorStatus = error.response && error.response.status;
        axios.isCancel(error)
          ? console.log("Отмена запроса")
          : showNotifyByResponseStatusCode(errorMessages, errorStatus);
      }
    }
    dispatch(setAppState(false));
  }
};
