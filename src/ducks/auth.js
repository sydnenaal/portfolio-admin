import { serverPath, queryWrapper } from "ducks";
import CryptoJS from "crypto-js";

const secretKey = Math.random() * 100;

export const checkAuth = ({ cancelToken, loginData, from, history }) =>
  queryWrapper({
    url: `${serverPath}/auth`,
    method: "post",
    body: {
      [secretKey]: CryptoJS.AES.encrypt(
        JSON.stringify(loginData),
        secretKey.toString()
      ).toString(),
    },
    cancelToken: cancelToken,
    errorMessage: "Неверный логин или пароль",
    successCallback: (_, response) => {
      localStorage.setItem("token", response.data.token);
      history.replace(from);
    },
  });
