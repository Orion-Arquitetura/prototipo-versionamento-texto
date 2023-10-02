import { ReactNode, createContext, useState } from "react";

type DialogModalContextType = {
    isOpen: boolean;
    open: (message: string) => void;
    close: () => void;
    message: string;
};

export const DialogModalContext = createContext({} as DialogModalContextType);

export default function DialogModalContextProvider({ children }: { children: ReactNode }) {
    const [isOpen, setOpen] = useState(false);
    const [message, setMessage] = useState("")

    function open(message: string) {
        setMessage(message)
        setOpen(true)
    }

    function close() {
        setOpen(false)
    }

    return (
        <DialogModalContext.Provider
            value={{
                isOpen,
                open,
                close,
                message
            }}
        >
            {children}
        </DialogModalContext.Provider>
    )
}
