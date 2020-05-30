import React from "react";
import { Button } from "semantic-ui-react";
import { NotificationManager } from "react-notifications";

const Reset = ({ locale }) => {
  const handleReset = () => {
    try {
      localStorage.clear();
      NotificationManager.success("Произошел сброс настроек", "Сброс");
    } catch (err) {
      NotificationManager.error("Сброс не удался", "Сброс");
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
