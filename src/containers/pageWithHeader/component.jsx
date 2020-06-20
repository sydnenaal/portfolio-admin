import React, { memo, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useIntl } from "react-intl";
import { Icon, Dropdown } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

import { drawerItems } from "constants/drawerConstants";
import { themeStyle } from "constants/themingStyles";
import { selectUserData } from "redux/selectors";
import { getUserData } from "ducks";
import "./style.sass";
import userPlaceholder from "assets/userPlaceholder.png";

import BarsIcon from "./components/barsIcon";

const PageWithHeaderComponent = ({
  drawerVisible,
  handleDrawerVisible,
  title,
  subtitle,
  children,
}) => {
  const {
    messages: { titles },
  } = useIntl();

  const history = useHistory();
  const { pathname } = history.location;

  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();

  useEffect(() => {
    let source = axios.CancelToken.source();

    dispatch(getUserData({ cancelToken: source.token }));

    return () => {
      source.cancel();
    };
  }, [dispatch]);

  function handleClick() {
    if (this.path === "/auth") {
      localStorage.removeItem("token");
      history.push("/auth");
    } else {
      history.push(this.path);
      handleDrawerVisible();
    }
  }
  const handleMouseLeave = () => {
    drawerVisible && handleDrawerVisible();
  };

  const itemStyle = { backgroundColor: "#333" };
  const drawerStyle = { maxWidth: drawerVisible ? "220px" : "70px" };
  const theme = useSelector((state) => state.theme.theme);
  const styleByTheme = themeStyle[theme];
  const userOptions = [
    {
      key: "0",
      text: "Profile",
      value: "profile",
      onClick: () => console.log("click profile"),
    },
    {
      key: "1",
      text: "Logout",
      value: "logout",
      onClick: () => {
        localStorage.removeItem("token");
        history.push("/auth");
      },
    },
  ];

  return (
    <div className="drawer">
      <div className="staticElements">
        <div
          className="sidebar"
          style={drawerStyle}
          onMouseLeave={handleMouseLeave}
        >
          <BarsIcon
            handleDrawerVisible={handleDrawerVisible}
            drawerVisible={drawerVisible}
          />

          {drawerItems(titles).map((item, index) => (
            <div
              className="sidebar-item"
              onClick={handleClick.bind(item)}
              style={pathname === item.path ? itemStyle : {}}
              key={index}
            >
              <div className="sidebar-item__icon">
                <Icon name={item.icon} size="big" />
              </div>

              <div className="sidebar-item__title">{item.title}</div>
            </div>
          ))}
        </div>

        <div className="header" style={styleByTheme}>
          <div className="headerContent">
            <div className="headerTitleContainer">
              <div className="headerTitle">{title}</div>
              {subtitle && <div className="headerSubtitle">/{subtitle}</div>}
            </div>
            <div className="headerUserInfo">
              <div className="headerUserPhoto">
                <img
                  width="30px"
                  src={userData.photo || userPlaceholder}
                  alt="user-photo"
                />
              </div>
              <div className="headerUserName">
                <Dropdown inline options={userOptions} text={userData.name} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pageWithHeader">
        <div className="body" style={styleByTheme}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default memo(PageWithHeaderComponent);
