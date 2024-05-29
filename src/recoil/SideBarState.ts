import { atom } from "recoil";

export const SideBarState = atom<string>({
  key: "SideBarState",
  default: "",
});
