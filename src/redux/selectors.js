export const selectLanguage = (state) => state.language.language;
export const selectTheme = (state) => state.theme.theme;
export const selectLoading = (state) => state.appState.isLoading;
export const selectProjects = (state) => state.projects.projects;
export const selectActiveMessage = (state) => state.messages.activeMessage;
export const selectActiveTab = (state) => state.messages.activeTab;
export const selectSortedMessages = (state) => state.messages.tabSortedMessages;
export const selectMessages = (state) => state.messages.messages;
