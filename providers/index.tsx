import { ReactNode } from "react";

import { FavoritesProvider } from "./FavoritesContext";

const Providers = ({ children }: { children: ReactNode }) => {
  return <FavoritesProvider>{children}</FavoritesProvider>;
};

export default Providers;
