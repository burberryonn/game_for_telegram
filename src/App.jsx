import { useState, useEffect } from "react";
import "./App.css";
import CryptoJS from "crypto-js"; // Импортируем библиотеку

function App() {
  const [count, setCount] = useState(0);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Проверка наличия Telegram WebApp
    if (window.Telegram) {
      const data_check_string = window.Telegram.WebApp.initData;

      const secret_key = "7389532998:AAGby3TxdbBs1saGQ9kLJd_bwaFzTyOv0Us"; // Ваш секретный ключ
      const hash = "someExpectedHash"; // Укажите ожидаемый хэш здесь

      // Вычисляем HMAC
      const computedHmac = CryptoJS.HmacSHA256(data_check_string, secret_key);
      const hexHmac = computedHmac.toString(CryptoJS.enc.Hex); // Преобразуем в строку в шестнадцатеричном формате

      // Сравниваем вычисленный HMAC с ожидаемым значением
      if (hexHmac === hash) {
        setUserData(window.Telegram.WebApp.WebAppUser); // Получение данных пользователя из Telegram
        console.log("111111111");
        console.log(`${window.Telegram}`);
        console.log(`${window.Telegram.WebAppUser}`);
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
      {window.Telegram.WebApp.initData}
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
