import Theme from "./theme";
import Password from "./password";
import Language from "./language";
import UserData from "./userData";
import Reset from "./reset";
import userName from "./userName";
import userPhoto from "./userPhoto";
import messagesSearch from "./messagesSearch";
import projectsSearch from "./projectsSearch";
import ProjectsDense from "./projectsDense";

export const mainComponents = [Theme, Language, Reset];
export const userComponents = [Password, UserData, userName, userPhoto];
export const messagesComponents = [messagesSearch];
export const projectsComponents = [projectsSearch, ProjectsDense];
