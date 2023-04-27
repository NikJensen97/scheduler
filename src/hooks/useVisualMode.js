import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    // handle stale state here (eventually)
    // setHistory(prev => ([...prev, mode]))
    setHistory(prev => {
     return replace ? [...prev.slice(0, prev.length - 1), mode] : [...prev, mode]
    })



    /*{

      const newHistory = [...history];
      if (replace) {
        newHistory.pop();
      }
      newHistory.push(mode);
      setHistory(newHistory)
    }
    */
    setMode(mode);
  };

  function back() {
    if (history.length <= 1) {
      return;
    }

    const newHistory = [...history];
    newHistory.pop();
    const mode = newHistory[newHistory.length - 1];
    setMode(mode);
    setHistory(newHistory);
  };

  return { mode, transition, back };
}