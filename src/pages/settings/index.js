import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { getContactData } from "api";
import { selectContacts } from "selectors";
import SettingsPageComponent from "./component";

const SettingsPageContainer = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = { cancelToken: source.token, title: "getContacts" };
    !contacts && dispatch(getContactData(fetchData));

    return source.cancel;
  }, [contacts, dispatch]);

  return <SettingsPageComponent />;
};

export default SettingsPageContainer;
