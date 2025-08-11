import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store";

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};
