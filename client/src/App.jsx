import { useState, useEffect } from "react";
import "./App.css";
import CryptoJS from "crypto-js"; // Импортируем библиотеку

function App() {
  const [count, setCount] = useState(0);
  const [userData, setUserData] = useState(null);
  const [players, setPlayers] = useState(new Map());

  useEffect(() => {
    if (window.Telegram) {
      const data_check_string = window.Telegram.WebApp.initData;

      const secret_key = "7389532998:AAGby3TxdbBs1saGQ9kLJd_bwaFzTyOv0Us"; // Ваш секретный ключ
      const hash = CryptoJS.HmacSHA256(data_check_string, secret_key).toString(CryptoJS.enc.Hex);

      const computedHmac = CryptoJS.HmacSHA256(data_check_string, secret_key);
      const hexHmac = computedHmac.toString(CryptoJS.enc.Hex); // Преобразуем в строку в шестнадцатеричном формате

      if (hexHmac === hash) {
        console.log("HMAC проверен успешно. Получаем данные пользователя.");
        window.Telegram.WebApp.ready();

        const user = window.Telegram.WebApp.initDataUnsafe.user; // Получение данных пользователя из Telegram
        console.log("User data:", user); // Логируем данные пользователя

        if (user) {
          setUserData(user);
          setPlayers((prev) => new Map(prev).set(user.username, 0));
          fetchScores(); // Получаем начальные очки
        } else {
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
      console.log("Telegram WebApp SDK недоступен. Используются тестовые данные.");
    }
  }, []);

  const fetchScores = async () => {
    const response = await fetch('http://localhost:3000/scores');
    const data = await response.json();
    setPlayers(new Map(Object.entries(data.users).map(([k, v]) => [k, v])));
  };

  const handleClick = async () => {
    if (!userData) return;

    const response = await fetch('http://localhost:3000/click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: userData.username }),
    });

    const result = await response.json();

    if (result.success) {
      setPlayers((prev) => new Map(prev).set(userData.username, result.score));
      setCount((prevCount) => prevCount + 1);
    } else {
      console.error(result.message);
    }
  };

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
      <div>
        <h2>ИГРОКИ:</h2>
        {Array.from(players.entries()).map(([username, score]) => (
          <p key={username}>{username}: {score}</p>
        ))}
      </div>
      <button onClick={handleClick}>
        Click Me!
      </button>
    </div>
  );
}

export default App;