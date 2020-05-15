export const tabsNames = ["all", "unread", "read", "important", "trash"];

export const tabFilter = {
  all: (item) => !item.isDeleted,
  read: (item) => item.isRead && !item.isDeleted,
  unread: (item) => !item.isRead && !item.isDeleted,
  important: (item) => item.isImportant && !item.isDeleted,
  trash: (item) => item.isDeleted,
};
