import { useState } from "react";

// For the transitions of the Appointment component
export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // transition from one mode to another, add the newmode to the history array
  const transition = (newMode, replace = false) => {
    
    setMode(newMode);

    if (!replace) {                              // if replace is false, add the newMode to the history array
      setHistory(prev => [...prev, newMode]);
    }

    if (replace) {                              // if replace is true, replace the last history item by the newMode
      history.pop();
      setHistory(prev => [...prev, newMode]);
    }
  };

  // go back to the previous mode, removes the last mode from the history array
  const back = () => {

    if (history.length > 1) {
    history.pop();
    setMode(history[history.length -1]);
    }

  };

  return { 
    mode, 
    transition,
    back 
  };
};