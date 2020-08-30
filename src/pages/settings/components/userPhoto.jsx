import React, { useCallback } from "react";
import { Button } from "semantic-ui-react";
import { store } from "react-notifications-component";

import { notificationSettings } from "constants/notificationSettings";

const Reset = ({ locale }) => {
  const handleReset = useCallback(() => {
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
  }, []);

  return (
    <div id="reset">
      <p>Изменить фотографию профиля</p>
      <div>
        <Button onClick={handleReset}>Выбрать</Button>
      </div>
    </div>
  );
};

export default Reset;
