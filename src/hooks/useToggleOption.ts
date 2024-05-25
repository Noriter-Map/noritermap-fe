import { useRecoilState } from "recoil";
import { OptionState, OptionsState } from "../recoil/OptionState";

export const useToggleOption = (category: string, option: string) => {
  const [optionsState, setOptionsState] = useRecoilState(OptionState);

  const isChecked = optionsState[category][option];

  const toggleOption = () => {
    setOptionsState((prev: OptionsState) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [option]: !prev[category][option],
      },
    }));
  };

  return [isChecked, toggleOption] as const;
};
