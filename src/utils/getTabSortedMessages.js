import { tabsNames, tabFilter } from "constants/messagesConstants";
import { setTabSortedMessages } from "ducks";

export const sortMessages = ({ messages, dispatch }) => {
  const tabs = {};
  tabsNames.forEach((item) => {
    tabs[item] = messages.filter(tabFilter[item]);
  });

  dispatch(setTabSortedMessages(tabs));
};
