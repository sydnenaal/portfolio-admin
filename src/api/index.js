const appMode = process.env.NODE_ENV.toUpperCase();

export const serverPath = process.env[`REACT_APP_SERVER_PATH_${appMode}`];
export const apiServices = `${serverPath}/api`;

export * from "./messages";
export * from "./projects";
export * from "./main";
export * from "./settings";
export * from "./auth";
