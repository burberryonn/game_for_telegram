import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const tg = window.Telegram.WebApp.initData;
  return (
    <>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      {tg}
    </>
  );
}

export default App;
