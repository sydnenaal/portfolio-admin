import {
  SET_MESSAGES,
  SET_TAB,
  SET_TAB_SORTED_MESSAGES,
  SET_ACTIVE_MESSAGE,
  SET_NEW_MESSAGES_COUNTER,
  SET_MESSAGES_SEARCH_FOR,
} from "ducks/types";

export const setMessages = (messages) => ({
  type: SET_MESSAGES,
  payload: messages,
});

export const setTabSortedMessages = (tabSortedMessages) => ({
  type: SET_TAB_SORTED_MESSAGES,
  payload: tabSortedMessages,
});

export const setActiveMessage = (activeMessage) => ({
  type: SET_ACTIVE_MESSAGE,
  payload: activeMessage,
});

export const setTab = (tab) => ({
  type: SET_TAB,
  payload: tab,
});

export const setNewMessagesCounter = (counter) => ({
  type: SET_NEW_MESSAGES_COUNTER,
  payload: counter,
});

export const setMessagesSearchTrigger = (action) => ({
  type: SET_MESSAGES_SEARCH_FOR,
  payload: action,
});

const messagesInitialState = {
  messages: null,
  counter: 0,
  tabSortedMessages: [],
  activeMessage: null,
  activeTab: "all",
  searchFor: "client",
};

export const messagesReducer = (state = messagesInitialState, action) => {
  switch (action.type) {
    case SET_NEW_MESSAGES_COUNTER:
      return { ...state, counter: action.payload };
    case SET_MESSAGES:
      return { ...state, messages: action.payload };
    case SET_TAB_SORTED_MESSAGES:
      return { ...state, tabSortedMessages: action.payload };
    case SET_TAB:
      return { ...state, activeTab: action.payload };
    case SET_ACTIVE_MESSAGE:
      return { ...state, activeMessage: action.payload };
    case SET_MESSAGES_SEARCH_FOR:
      return { ...state, searchFor: action.payload };
    default:
      return state;
  }
};
