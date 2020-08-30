import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Radio } from "semantic-ui-react";

import "../style.sass";
import { setIsDense } from "ducks";
import { selectIsDenseProjects } from "selectors";

const ProjectsDense = () => {
  const isDense = useSelector(selectIsDenseProjects);
  const dispatch = useDispatch();

  const handleChangeIsDense = useCallback(() => {
    const isDense = !!localStorage.getItem("isDense");
    dispatch(setIsDense(!isDense));
    isDense
      ? localStorage.removeItem("isDense")
      : localStorage.setItem("isDense", "true");
  }, [dispatch]);

  return (
    <div id="theme">
      <p>Компактные колонки таблицы</p>
      <Radio slider checked={isDense} onChange={handleChangeIsDense} />
    </div>
  );
};

export default ProjectsDense;
