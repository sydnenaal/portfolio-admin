import axios from "axios";

import { showNotifyByResponseStatusCode } from "./notifications";
import { selectRequestStack } from "redux/selectors";
import { setRequestStack } from "redux/actions";

export const queryWrapper = ({
  title,
  successCallback,
  method,
  url,
  cancelToken,
  body,
  errorMessages,
}) => async (dispatch, getState) => {
  let requestStack = selectRequestStack(getState());
  dispatch(setRequestStack([...requestStack, title]));

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

  requestStack = selectRequestStack(getState());
  dispatch(setRequestStack(requestStack.filter((item) => item !== title)));
};
