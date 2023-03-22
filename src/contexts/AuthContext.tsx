import { createContext, useState } from "react";

type signInData = {
  email: string,
  senha: string
}

type AuthContextType = {
  signIn: ({email, senha}: signInData) => void;
};



export const AuthContext = createContext({} as AuthContextType);

export default function AuthContextProvider({ children }: any) {
  const [userData, setUserData] = useState(null);

  async function signIn({email, senha}: signInData) {

  }

  return (
    <AuthContext.Provider value={{ signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
