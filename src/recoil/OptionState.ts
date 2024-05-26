import { atom } from "recoil";
// import { persistAtom } from "./persistAtom";

import { SearchOptions } from "../constants/SearchOptions";

export type OptionsState = {
  [category: string]: {
    [option: string]: boolean;
  };
};

const initialOptionsState: OptionsState = SearchOptions.reduce(
  (acc, { category, option }) => {
    acc[category] = option.reduce((optionAcc, opt) => {
      optionAcc[opt] = false;
      return optionAcc;
    }, {} as { [option: string]: boolean });
    return acc;
  },
  {} as OptionsState
);

export const OptionState = atom({
  key: "OptionState",
  default: initialOptionsState,
});
