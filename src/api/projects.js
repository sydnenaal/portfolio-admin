import { apiServices } from "constants/apiConstants";

export const insertProjects = {
  method: "put",
  url: `${apiServices}/projects/insert`,
};

export const deleteProjects = {
  method: "delete",
  url: `${apiServices}/projects/delete`,
};

export const getProjects = {
  url: `${apiServices}/projects`,
  method: "get",
  errorMessages: {
    500: { message: "Не удалось загрузить проекты", type: "danger" },
  },
};
