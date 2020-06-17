import { serverPath } from "ducks";
import { queryWrapper } from "utils";
import { encryptData } from "utils";

export const checkAuth = ({ cancelToken, loginData, from, history }) =>
  queryWrapper({
    url: `${serverPath}/auth`,
    method: "post",
    body: { data: encryptData(JSON.stringify(loginData)) },
    cancelToken: cancelToken,
    errorMessages: {
      500: { message: "Неверный логин или пароль", type: "danger" },
    },
    successCallback: (_, response) => {
      localStorage.setItem("token", response.data.token);
      history.replace(from);
    },
  });
