import React from "react";
import { Button } from "semantic-ui-react";
import { store } from "react-notifications-component";

import { notificationSettings } from "constants/notificationSettings";

const Reset = ({ locale }) => {
  const handleReset = () => {
    try {
      localStorage.clear();
      store.addNotification({
        ...notificationSettings,
        title: "Сброс",
        message: "Произошел сброс настроек",
        type: "success",
      });
    } catch (err) {
      store.addNotification({
        ...notificationSettings,
        title: "Сброс",
        message: "Сброс не удался",
        type: "error",
      });
    }
  };

  return (
    <div id="reset">
      <p>{locale.settings.reset}</p>
      <div>
        <Button onClick={handleReset}>{locale.settings.resetButton}</Button>
      </div>
    </div>
  );
};

export default Reset;
