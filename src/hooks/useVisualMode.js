import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    const newHistory = [...history];
    if (replace) {
      newHistory.pop();
    }
    newHistory.push(mode);
    setMode(mode);
    setHistory(newHistory)
  };

  function back() {
    if (history.length <= 1) {
      return;
    }

    const newHistory = [...history];
    newHistory.pop();
    const mode = newHistory[newHistory.length - 1];
    setMode(mode);
    setHistory(newHistory)
  };

  return { mode, transition, back };
}