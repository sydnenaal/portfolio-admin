import { dateParse } from "utils";
import { setProjects } from "redux/actions";
import { serverPath } from "ducks";
import { queryWrapper } from "utils";

export const deleteProjects = () => {};

export const getProjects = ({ cancelToken, title }) => {
  return queryWrapper({
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
};
