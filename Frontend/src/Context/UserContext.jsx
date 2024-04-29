import { createContext, useState } from "react";

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [Userdata, setUserData] = useState({});
  return <UserContext.Provider value={[Userdata, setUserData]}>{children}</UserContext.Provider>;
}
