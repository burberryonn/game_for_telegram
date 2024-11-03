import { useState, useEffect } from "react";
import "./App.css";
import CryptoJS from "crypto-js"; // Импортируем библиотеку

function App() {
  const [count, setCount] = useState(0);
  const [userData, setUserData] = useState(null);
  const players = new Map()

  useEffect(() => {
    if (window.Telegram) {
      const data_check_string = window.Telegram.WebApp.initData;

      const secret_key = "7389532998:AAGby3TxdbBs1saGQ9kLJd_bwaFzTyOv0Us"; // Ваш секретный ключ
      const hash = CryptoJS.HmacSHA256(data_check_string, secret_key).toString(
        CryptoJS.enc.Hex
      );

      const computedHmac = CryptoJS.HmacSHA256(data_check_string, secret_key);
      const hexHmac = computedHmac.toString(CryptoJS.enc.Hex); // Преобразуем в строку в шестнадцатеричном формате

      if (hexHmac === hash) {
        console.log("HMAC проверен успешно. Получаем данные пользователя.");

        console.log("Telegram WebApp:", window.Telegram.WebApp);

        window.Telegram.WebApp.ready();

        const user = window.Telegram.WebApp.initDataUnsafe.user; // Получение данных пользователя из Telegram
        console.log("User data:", user); // Логируем данные пользователя

        if (user && players.has(user.username)) {
          setUserData(user);
        } else {
          players.get(user.username, 0)
          console.error("Данные о пользователе недоступны.");
        }
      } else {
        console.error("Неверный HMAC.");
      }
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
            Привет, {userData?.first_name} {userData?.last_name}!
          </p>
          <p>Ваш username: @{userData.username}</p>
        </div>
      ) : (
        <p>Не удалось получить данные пользователя</p>
      )}
  {players}
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>
        count is {count}
      </button>
    </div>
  );
}

export default App;
