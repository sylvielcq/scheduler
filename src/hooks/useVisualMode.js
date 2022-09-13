import { useState } from "react";

// For the transitions of the Appointment component
export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // transition from one mode to another, add the newmode to the history array
  const transition = (newMode, replace = false) => {
    console.log("NEWMODE ", newMode)

    setMode(newMode);

    if (!replace) {  
      console.log("REPLACE IS FALSE", history)              // if replace is false, add the newMode to the history array
      setHistory(prev => [...prev, newMode]);
    }

    if (replace) {     
      console.log("REPLACE IS TRUE", history)             // if replace is true, replace the last history item by the newMode
      history.pop();
      console.log("HISTORY AFTER POP: ", history)
      setHistory(prev => [...prev, newMode]);
    }

    console.log("HISTORY FINAL :", history)
  };

  const back = () => {
    console.log('IN BACK FUNCTION :', history)
    
    if (history.length > 1) {
    history.pop();
    console.log("IN BACK(), HISTORY AFTER POP", history)
    setMode(history[history.length -1]);
    }

  };

  return { 
    mode, 
    transition,
    back 
  };
};

// const transition = (newMode, replace = false) => {
  //   if (replace) {
  //     setMode(newMode);
  //     setHistory((prev) => [...prev]); 
  //   } else {       
  //     setMode(newMode);       
  //     setHistory((prev) => [...prev, newMode]);     
  //   }   
  // };    
  // const back = () => {     
  //   if (history.length !== 0) {       
  //     history.pop();       
  //     setMode(history[history.length - 1]);     
  //   }   
  // };

  // console.log("IN BETWEEN", history)
  // go back to the previous mode, removes the last mode from the history array