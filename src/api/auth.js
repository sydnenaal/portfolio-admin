import { serverPath } from "api";
import { queryWrapper, encryptData } from "utils";
import { setUserData } from "redux/actions";

export const checkAuth = ({ cancelToken, loginData, from, history, title }) =>
  queryWrapper({
    url: `${serverPath}/auth`,
    method: "post",
    body: { data: encryptData(JSON.stringify(loginData)) },
    cancelToken: cancelToken,
    title: title,
    errorMessages: {
      500: { message: "Неверный логин или пароль", type: "danger" },
    },
    successCallback: (dispatch, response) => {
      dispatch(
        setUserData({ name: response.data.name, photo: response.data.photo })
      );
      localStorage.setItem("token", response.data.token);
      history.replace(from);
    },
  });

export const getUserData = ({ cancelToken, title }) =>
  queryWrapper({
    url: `${serverPath}/users/getUserData`,
    method: "get",
    cancelToken: cancelToken,
    title: title,
    errorMessages: {
      500: {
        message: "Не удалось загрузить данные текущего пользователя",
        type: "danger",
      },
    },
    successCallback: (dispatch, response) => {
      dispatch(
        setUserData({ name: response.data.name, photo: response.data.photo })
      );
    },
  });
