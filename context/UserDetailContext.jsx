// import { createContext } from "react";

// export const UserDetailContext = createContext([{},()=>{}]);
import { createContext } from "react";

export const UserDetailContext = createContext({
    userDetail: null,
    setUserDetail: (detail) => {},
});
