import { useCallback, useState } from "react";

export default function useSettingsExpander() {
  const [isShow, setIsShow] = useState(false);
  const contentStyle = useMemo(() => ({ maxHeight: `${isShow ? 300 : 0}px` }), [
    isShow,
  ]);
  const chevronStyle = useMemo(
    () => ({ transform: `rotate(${isShow ? 180 : 0}deg)` }),
    [isShow]
  );

  const handleToggleExpander = useCallback(() => {
    setIsShow((curState) => !curState);
  }, []);

  return { contentStyle, chevronStyle, handleToggleExpander };
}
