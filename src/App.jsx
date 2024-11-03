import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Инициализация WebApp
    window.Telegram.WebApp.init();

    // Проверка и установка данных пользователя из Telegram
    const user = window.Telegram.WebApp.initDataUnsafe;
    setUserData(user);
  }, []);

  return (
    <div className="App">
      <h1>Мини-приложение Telegram</h1>
      
      {userData ? (
        <div>
          <p>Привет, {userData.first_name} {userData.last_name}!</p>
          <p>Ваш username: @{userData.username}</p>
        </div>
      ) : (
        <p>Не удалось получить данные пользователя</p>
      )}
      
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>
        count is {count}
      </button>
    </div>
  );
}

export default App;