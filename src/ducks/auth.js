import { serverPath, queryWrapper } from "ducks";
import { encryptData } from "utils";

export const checkAuth = ({ cancelToken, loginData, from, history }) =>
  queryWrapper({
    url: `${serverPath}/auth`,
    method: "post",
    body: { data: encryptData(JSON.stringify(loginData)) },
    cancelToken: cancelToken,
    errorMessage: "Неверный логин или пароль",
    successCallback: (_, response) => {
      localStorage.setItem("token", response.data.token);
      history.replace(from);
    },
  });
