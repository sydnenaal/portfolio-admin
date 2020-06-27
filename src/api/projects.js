import { dateParse } from "utils";
import { setProjects } from "ducks";
import { serverPath } from "api";
import { queryWrapper } from "utils";

export const insertProjects = ({ cancelToken, title, body }) =>
  queryWrapper({
    cancelToken: cancelToken,
    title: title,
    method: "put",
    url: `${serverPath}/projects/insert`,
    body: body,
    successCallback: (dispatch, response) => {
      const responseWithChecked = response.data.map((item) => ({
        ...item,
        isChecked: false,
        createDate: dateParse(item.createDate),
      }));

      dispatch(setProjects(responseWithChecked));
    },
  });

export const deleteProjects = ({ cancelToken, title, data }) =>
  queryWrapper({
    cancelToken: cancelToken,
    title: title,
    method: "delete",
    url: `${serverPath}/projects/delete`,
    body: data,
    successCallback: (dispatch, response) => {
      const responseWithChecked = response.data.map((item) => ({
        ...item,
        isChecked: false,
        createDate: dateParse(item.createDate),
      }));

      dispatch(setProjects(responseWithChecked));
    },
  });

export const getProjects = ({ cancelToken, title }) =>
  queryWrapper({
    cancelToken: cancelToken,
    title: title,
    url: `${serverPath}/projects`,
    method: "get",
    errorMessages: {
      500: { message: "Не удалось загрузить проекты", type: "danger" },
    },
    successCallback: (dispatch, response) => {
      const responseWithChecked = response.data.map((item) => ({
        ...item,
        isChecked: false,
        createDate: dateParse(item.createDate),
      }));

      dispatch(setProjects(responseWithChecked));
    },
  });
