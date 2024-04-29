import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

export const useUserContext = () => {
  const context = useContext(UserContext);

  return context;
};
