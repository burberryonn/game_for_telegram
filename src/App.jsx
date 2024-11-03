import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Проверка наличия Telegram WebApp
    if (window.Telegram) {
      setUserData(window.Telegram.WebApp.WebAppUser); // Получение данных пользователя из Telegram
      console.log("111111111");
      console.log(`${window.Telegram.WebApp}`);
    } else {
      setUserData({
        id: "123456789",
        first_name: "Олег",
        last_name: "ХУЙ ТЕБЕ",
        username: "burberryonn",
      });
      console.log(
        "Telegram WebApp SDK недоступен. Используются тестовые данные."
      );
    }
  }, []);

  return (
    <div className="App">
      <h1>Мини-приложение Telegram</h1>
      {userData ? (
        <div>
          <p>
            Привет, {userData.first_name} {userData.last_name}!
          </p>
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
