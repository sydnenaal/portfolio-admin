import { tabsNames, tabFilter } from "constants/messagesConstants";

export function sortMessages(messages) {
  if (!messages) {
    return {};
  }

  return tabsNames.reduce((acc, item) => {
    const filtered = messages.filter(tabFilter[item]);

    return { ...acc, [item]: filtered };
  }, {});
}
