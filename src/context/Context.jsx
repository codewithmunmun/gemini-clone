import { createContext, useEffect } from "react";
import { runGemini } from "../config/gemini";

const Context = createContext();

const ContextProvider = (props) => {
  const onSent = async (prompt) => {
    const response = await runGemini(prompt);
    console.log("📝 Gemini Response:", response);
  };

  // ✅ Run once when context loads
  useEffect(() => {
    onSent("What is React js?");
  }, []);

  const contextValue = {};

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
