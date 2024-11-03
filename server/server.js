const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;
const dataFile = 'data.json';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Загружаем данные из файла
let data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

// Получить текущие очки
app.get('/scores', (req, res) => {
  res.json(data);
});

// Обновить очки
app.post('/click', (req, res) => {
  const { username } = req.body;
  
  if (data.users[username] !== undefined) {
    data.users[username] += 1; // Увеличиваем счет
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2)); // Сохраняем изменения
    res.json({ success: true, score: data.users[username] });
  } else {
    res.status(400).json({ success: false, message: 'Пользователь не найден.' });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});