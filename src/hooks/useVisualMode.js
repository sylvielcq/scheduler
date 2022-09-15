import { useState } from "react";

// For the transitions of the Appointment component
export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // transition from one mode to another, add the newmode to the history array
  const transition = (newMode, replace = false) => {
    
    if (replace) {                          // if replace is true, just re-render the prev history
      setMode(newMode);
      setHistory((prev) => [...prev]);
    } else {                                // if replace if false (default), add newMode to history
      setMode(newMode);
      setHistory((prev) => [...prev, newMode]);
    }
  };

  // go back to the previous mode, remove the last mode from the history array
  const back = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
  };

  return { 
    mode, 
    transition,
    back 
  };
};


 