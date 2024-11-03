import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [players, setPlayers] = useState([]);
  const tg = window.Telegram.WebApp.initData;

  return (
    <>
      {`${tg.username}\n\n${tg.first_name}\n\n${tg.last_name}`}
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </>
  );
}

export default App;
