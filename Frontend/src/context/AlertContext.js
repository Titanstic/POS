import { createContext, useState } from "react";

const AlertContext = createContext();

export const AlertContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [completeText, setCompleteText] = useState("");
  const [itemId, setItemId] = useState(null);
  const [unique, setUnique] = useState(null);

  return (
    <AlertContext.Provider
      value={{
        loading,
        setLoading,
        showDelete,
        setShowDelete,
        showComplete,
        setShowComplete,
        completeText,
        setCompleteText,
        itemId,
        setItemId,
        unique,
        setUnique,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
