import React, { memo, useEffect, useMemo, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useIntl } from "react-intl";
import { Dropdown } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

import { drawerItems } from "constants/drawerConstants";
import { themeStyle } from "constants/themingStyles";
import { selectUserData, selectTheme } from "selectors";
import { setUserData } from "ducks";
import { getUserData } from "api";
import "./style.sass";
import userPlaceholder from "assets/userPlaceholder.png";
import { BarsIcon, DrawerItem } from "./components";
import { useRequest } from "hooks";

const dropdownParams = [
  {
    key: "0",
    text: "Profile",
    icon: "user",
    value: "profile",
  },
  {
    key: "1",
    text: "Logout",
    icon: "sign-out",
    value: "logout",
  },
];

function PageWithHeaderComponent({ title, subtitle, children }) {
  const {
    messages: { titles },
  } = useIntl();

  const history = useHistory();
  const theme = useSelector(selectTheme);
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const requestWrapper = useRequest();
  const [isVisible, setIsVisible] = useState(false);
  const screenWidth = document.documentElement.clientWidth;
  const drawerStyle = useMemo(() => {
    const startWidth = screenWidth < 500 ? "0px" : "70px";

    return { maxWidth: isVisible ? "220px" : startWidth };
  }, [isVisible, screenWidth]);
  const styleByTheme = useMemo(() => themeStyle[theme], [theme]);

  const userOptions = useMemo(() => {
    const actions = [
      () => console.log("click profile"),
      () => {
        localStorage.removeItem("token");
        history.push("/authentication");
      },
    ];

    return dropdownParams.map((item) => ({
      ...item,
      onClick: actions[item.key],
    }));
  }, [history]);

  const handleChangeIsVisible = useCallback(() => {
    setIsVisible((isVisible) => !isVisible);
  }, []);

  useEffect(() => {
    const params = { ...getUserData, title: "getUserData" };

    function handleSuccess(response) {
      const { data } = response;

      dispatch(setUserData(data));
    }

    dispatch(requestWrapper(params, handleSuccess));
  }, [requestWrapper, dispatch]);

  function handleClick() {
    if (this.path === "/authentication") {
      localStorage.removeItem("token");
      history.push("/authentication");
    } else {
      history.push(this.path);
      handleChangeIsVisible();
    }
  }

  const handleMouseLeave = useCallback(() => {
    setIsVisible((isVisible) => {
      if (isVisible) {
        return false;
      }

      return isVisible;
    });
  }, []);

  return (
    <div className="drawer">
      <div className="staticElements">
        <div className="header" style={styleByTheme}>
          <BarsIcon
            handleDrawerVisible={handleChangeIsVisible}
            drawerVisible={isVisible}
            color={styleByTheme.color}
          />
          <div className="headerContent">
            <div className="headerTitleContainer">
              <div className="headerTitle">{title}</div>
              {subtitle && <div className="headerSubtitle">/{subtitle}</div>}
            </div>
            {screenWidth > 500 && (
              <div className="headerUserInfo">
                <div className="headerUserPhoto">
                  <img
                    width="30px"
                    src={userData.photo || userPlaceholder}
                    alt="user"
                  />
                </div>
                <div className="headerUserName">
                  <Dropdown inline options={userOptions} text={userData.name} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="pageWithHeader">
        <div
          className="sidebar"
          style={drawerStyle}
          onMouseLeave={handleMouseLeave}
        >
          {drawerItems(titles).map((item, index) => (
            <DrawerItem handleClick={handleClick} item={item} key={index} />
          ))}
        </div>
        <div className="body" style={styleByTheme}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default memo(PageWithHeaderComponent);
