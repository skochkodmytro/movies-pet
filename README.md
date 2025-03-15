# Опис архітектури проекту та інструкція запуску

## Архітектура проекту

### Основні папки

- app/ – містить навігацію між екранами.
- assets/ – ресурси, такі як іконки, зображення, шрифти.
- components/ – спільні компоненти для повторного використання.
- constants/ – файли з глобальними константами (наприклад, кольори, стилі).
- features/ – основний функціонал додатку, організований за модулями. Кожен модуль може включати папки api,components,views,hooks та інші, які релевантні до цього модуля. Також кожен модуль може експортувати частину функціоналу:
  - movie-details/ – логіка інформації про фільм.
  - movies/ – логіка для пошуку та відображення фільмів.
  - persons/ – логіка роботи з суб’єктом person (актори, режисери та інші).
- hooks/ – користувацькі хуки для управління станом та іншою логікою.
- providers/ – контексти для управління глобальним станом (наприклад, обрані фільми).
- utils/ – утилітні функції.

---

## Запуск проекту

### 1. Встановлення необхідних інструментів

- [Node.js](https://nodejs.org/) (рекомендована версія – LTS)
- npm або yarn
- Expo CLI:

```sh
  npm install -g expo-cli
```

### 2. Клонування репозиторію та встановлення залежностей

```sh
git clone https://github.com/skochkodmytro/movies-pet
cd movies-pet
npm install # або yarn install
```

### 3. Запуск проекту

```sh
expo start
```

Ця команда відкриє Expo Developer Tools у браузері, де можна обрати емулятор або підключити реальний пристрій через Expo Go. Ви можете просканувати QR-код у терміналі за допомогою камери.
