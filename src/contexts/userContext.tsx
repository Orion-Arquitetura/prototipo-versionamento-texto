import { createContext, useState } from "react";

type UserContextType = {
  authenticate: (email: string, senha: string) => Promise<UserDataType>;
  userData: UserDataType;
  changeUserData: (data:UserDataType) => void
};

type UserDataType = {
  email: string;
  nomeUsuario: string;
  permissoes: string[];
  edicao: {
    estaEditando: boolean;
    arquivos: string[];
  };
} | null;

export const UserContext = createContext({} as UserContextType);

export default function UserContextProvider({ children }: any) {
  const [userData, setUserData] = useState<UserDataType>(null);

  async function authenticate(email: string, senha: string) {
    const credenciais = {
      email: email,
      senha: senha,
    };

    const data = await fetch("/api/auth/authenticate", {
      method: "POST",
      body: JSON.stringify(credenciais),
    }).then((res) => (res.status === 404 ? null : res.json()));

    return data;
  }

  function changeUserData(data:UserDataType) {
    setUserData(data)
  }


  return (
    <UserContext.Provider value={{ authenticate, userData, changeUserData }}>
      {children}
    </UserContext.Provider>
  );
}
