import { dateParse } from "utils";
import { setProjects } from "redux/actions";
import { queryWrapper, serverPath } from "ducks";

export const deleteProjects = () => {};

export const getProjects = ({ cancelToken }) => {
  return queryWrapper({
    cancelToken: cancelToken,
    url: `${serverPath}/projects`,
    method: "get",
    errorMessage: "Не удалось загрузить проекты",
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
