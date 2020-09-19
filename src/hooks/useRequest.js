import { useEffect } from "react";
import axios from "axios";

import { showNotifyByResponseStatusCode } from "./notifications";
import { selectRequestStack } from "selectors";
import { setRequestStack } from "ducks";

export default function useRequest() {
  const { token: cancelToken, cancel } = useMemo(axios.CancelToken.source, []);

  const queryAction = useCallback(
    (params, callback) => async (dispatch, getState) => {
      const { title, method, url, body: data, errorMessages } = params;
      let requestStack = selectRequestStack(getState());

      dispatch(setRequestStack([...requestStack, title]));

      try {
        const authToken = localStorage.getItem("token") || "";
        const headers = { authToken };
        const requestParams = { method, url, data, headers, cancelToken };
        const response = await axios(requestParams);

        if (callback) {
          callback(response);
        }

        showNotifyByResponseStatusCode(response.status, errorMessages);
      } catch (error) {
        if (error.isAxiosError) {
          const errorStatus = error.response && error.response.status;
          const defaultErrorMessage = "Не удалось завершить операцию";
          const errorMessage = errorMessages || {
            500: { message: defaultErrorMessage, type: "danger" },
          };

          if (axios.isCancel(error)) {
            console.log("Отмена запроса");
          } else {
            showNotifyByResponseStatusCode(errorStatus, errorMessage);
          }
        }
      }

      requestStack = selectRequestStack(getState());
      dispatch(setRequestStack(requestStack.filter((item) => item !== title)));
    },
    []
  );

  useEffect(() => cancel, []);

  return queryAction;
}
