import { useState } from "react";
import "./App.css";

function App() {
  window.Telegram.WebApp.init();
  const [count, setCount] = useState(0);
  const [players, setPlayers] = useState([]);

  const user = window.Telegram.WebApp.initDataUnsafe;
  // const telegramUserData = {
  //   id: "389592101",
  //   first_name: "Олег",
  //   last_name: "Дьяконов",
  //   username: "burberryonn",
  //   hash: "7389532998:AAGby3TxdbBs1saGQ9kLJd_bwaFzTyOv0Us",
  // };

  return (
    <>
      {/* {`${tg.username}\n\n${tg.first_name}\n\n${tg.last_name}`} */}
      {user}
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </>
  );
}

export default App;
