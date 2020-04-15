export const drawerItems = (titles) => [
  {
    icon: "home",
    title: titles.home,
    path: "/",
  },
  {
    icon: "file",
    title: titles.projects,
    path: "/projects",
  },
  {
    icon: "mail",
    title: titles.mail,
    path: "/mail",
  },
  {
    icon: "settings",
    title: titles.settings,
    path: "/settings",
  },
  {
    icon: "log out",
    title: titles.logout,
    path: "/auth",
  },
];
