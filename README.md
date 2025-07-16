# GoalSight

[![Python](https://img.shields.io/badge/python-3.11%2B-blue)](https://www.python.org/) [![Django](https://img.shields.io/badge/Django-5.0-green)](https://www.djangoproject.com/) [![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> ⚽️ **GoalSight** — сервис для анализа и прогнозирования футбольных матчей с помощью машинного обучения. Удобная платформа для тренеров, журналистов и болельщиков!

---

## Демо

Продакшн-сервер: [https://goalsight.ru](https://goalsight.ru)

---

## О проекте

GoalSight — это современная платформа для сбора, визуализации и анализа футбольной статистики, а также прогнозирования исходов матчей с помощью ML. Проект включает:
- Django-бэкенд с REST API и интеграцией ML-моделей
- Фронтенд на React/TypeScript
- Импорт данных из CSV и внешних API
- Документацию и автоматизацию через Docker

---

## Быстрый старт

### Через Docker

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/IU-Capstone-Project-2025/GoalSight.git
   cd GoalSight
   ```
2. Расшифруйте файл переменных окружения:
   ```bash
   cd docker/local
   gpg --decrypt .env.gpg > .env
   ```
   > Для расшифровки нужен пароль. Если у вас его нет — обратитесь к [тим лиду](https://github.com/Arino4kaMyr).
3. Запустите сервисы:
   ```bash
   docker-compose up --build
   ```
- Бэкенд: http://localhost:8000/
- Фронтенд: http://localhost:3000/
---

## Тестирование

В проекте реализованы тесты для бэкенда (Django), ML (отдельно через pytest) и фронтенда (React):

### Бэкенд (Django)
- **Юнит- и интеграционные тесты** для моделей, сериализаторов, API и management-команд.
- Все тесты лежат в файлах `tests.py` и подпапках `tests/` внутри приложений.
- Запуск всех тестов:
  ```bash
  python goalsight/manage.py test
  ```

### ML-тесты (pytest)
- **Тесты ML-сервисов и моделей** лежат в `backend/goalsight/predictions/tests/`
- Запуск ML-тестов осуществляется отдельно через pytest:
  ```bash
  cd backend/goalsight/predictions
  pytest tests/
  ```

### Фронтенд (React)
- **Юнит-тесты** компонентов (Jest)
- **Интеграционные тесты** API (Jest)
- **E2E-тесты** пользовательских сценариев (Cypress)
- Тесты лежат в папке `frontend/__tests__/`

- Запуск юнит- и интеграционных тестов:
  ```bash
  npm test
  ```
- Запуск e2e-тестов (Cypress):
  ```bash
  npx cypress run
  ```
---

## Разработка

### Требования
- Python 3.11+
- Node.js 18+
- Docker (для быстрой сборки)

### Окружение
- Все переменные окружения для локального запуска хранятся в `docker/local/.env.gpg`
- ML-модели и артефакты: `backend/goalsight/ml_models/`
- Jupyter-ноутбуки: `notebooks/`

---

## Структура файлов
```
GoalSight/
├── backend/                  # Бэкенд на Django
│   ├── goalsight/            # Django-проект и приложения
│   │   ├── goalsight/        # Настройки Django (settings, urls, wsgi, asgi)
│   │   ├── matches/          # Приложение матчей (модели, сериализаторы, views, management-команды)
│   │   ├── teams/            # Приложение команд (модели, сериализаторы, views, management-команды)
│   │   ├── tournaments/      # Приложение турниров (модели, сериализаторы, views, management-команды)
│   │   ├── predictions/      # ML-сервис, API для предсказаний, ML-тесты
│   │   ├── ml_models/        # Файлы обученных ML-моделей и препроцессоров
│   │   ├── staticfiles/      # Статические файлы Django
│   │   └── manage.py         # Управляющий скрипт Django
│   ├── requirements.txt      # Зависимости Python
│   └── entrypoint.sh         # Скрипт для Docker
├── frontend/                 # Фронтенд на React/TypeScript
│   ├── src/                  # Исходный код приложения
│   │   ├── components/       # UI-компоненты
│   │   ├── pages/            # Страницы приложения
│   │   ├── styles/           # Стили
│   │   └── ...
│   ├── __tests__/            # Тесты фронтенда (Jest, Cypress)
│   ├── public/               # Статические файлы (index.html и др.)
│   ├── package.json          # Зависимости Node.js
│   └── ...
├── docker/                   # Docker-конфиги для разных окружений
│   ├── local/                # Локальная разработка
│   ├── production/           # Продакшн
│   └── staging/              # Staging
├── notebooks/                # Jupyter-ноутбуки для ML и анализа данных
├── openapi.yaml              # OpenAPI-схема для документации API
└── README.md                 # Документация проекта
```

---

## Документация
- Swagger: `/swagger/`  (при запущенном бэкенде)
- ML-ноутбуки: `notebooks/`

---

## Ветки
- `main` — стабильная версия
- `stage` — ветка для разработки

## Лицензия

Проект распространяется под лицензией MIT. Подробнее см. файл [LICENSE](LICENSE).



