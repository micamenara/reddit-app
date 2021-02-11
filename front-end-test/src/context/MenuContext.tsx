import { createContext } from "react";

export type MenuContextType = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const MenuContext = createContext<MenuContextType>({
  isOpen: false,
  setIsOpen: (value: boolean) => {},
});

export default MenuContext;
