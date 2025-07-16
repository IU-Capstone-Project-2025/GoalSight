# GoalSight

[![Python](https://img.shields.io/badge/python-3.11%2B-blue)](https://www.python.org/) [![Django](https://img.shields.io/badge/Django-5.0-green)](https://www.djangoproject.com/) [![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> ⚽️ **GoalSight** — a platform for football match analytics and prediction powered by machine learning. A convenient tool for coaches, journalists, and fans!

---

## Demo

[Link to our website](https://goalsight.ru)

---

## About the Project

GoalSight is a modern platform for collecting, visualizing, and analyzing football statistics, as well as predicting match outcomes using ML. The project includes:
- Django backend with REST API and ML model integration
- React/TypeScript frontend
- Data import from CSV and external APIs
- Documentation and automation via Docker

---

## Quick Start

### Using Docker

1. Clone the repository:
   ```bash
   git clone https://github.com/IU-Capstone-Project-2025/GoalSight.git
   cd GoalSight
   ```
2. Decrypt the environment variables file:
   ```bash
   cd docker/local
   gpg --decrypt .env.gpg > .env
   ```
   > You will need a password to decrypt. If you don't have it, contact the [team lead](https://github.com/Arino4kaMyr).
3. Start the services:
   ```bash
   docker-compose up --build
   ```
- Backend: http://localhost:8000/
- Frontend: http://localhost:3000/

---

## Testing

The project includes tests for the backend (Django), ML (separately via pytest), and frontend (React):

### Backend (Django)
- **Unit and integration tests** for models, serializers, API, and management commands.
- All tests are located in `tests.py` files and `tests/` subfolders inside each app.
- Run all tests:
  ```bash
  python backend/goalsight/manage.py test
  ```

### ML tests (pytest)
- **ML service and model tests** are located in `backend/goalsight/predictions/tests/`
- Run ML tests separately using pytest:
  ```bash
  cd backend/goalsight/predictions
  pytest tests/
  ```

### Frontend (React)
- **Unit tests** for components (Jest)
- **Integration tests** for API (Jest)
- **E2E tests** for user scenarios (Cypress)
- Tests are located in `frontend/__tests__/`

- Run unit and integration tests:
  ```bash
  npm run test:components
  npm run test:api
  ```
- Run e2e tests (Cypress):
  ```bash
  npm run test:e2e
  ```

---

## Development

### Requirements
- Python 3.11+
- Node.js 18+
- Docker (for quick setup)

### Environment
- All environment variables for local development are stored in `docker/local/.env.gpg`
- ML models and artifacts: `backend/goalsight/ml_models/`
- Jupyter notebooks: `notebooks/`

---

## File Structure
```
GoalSight/
├── backend/                  # Django backend
│   ├── goalsight/            # Django project and apps
│   │   ├── goalsight/        # Django settings (settings, urls, wsgi, asgi)
│   │   ├── matches/          # Matches app (models, serializers, views, management commands)
│   │   ├── teams/            # Teams app (models, serializers, views, management commands)
│   │   ├── tournaments/      # Tournaments app (models, serializers, views, management commands)
│   │   ├── predictions/      # ML service, prediction API, ML tests
│   │   ├── ml_models/        # Trained ML models and preprocessors
│   │   ├── staticfiles/      # Django static files
│   │   └── manage.py         # Django management script
│   ├── requirements.txt      # Python dependencies
│   └── entrypoint.sh         # Docker entrypoint script
├── frontend/                 # React/TypeScript frontend
│   ├── src/                  # Application source code
│   │   ├── components/       # UI components
│   │   ├── pages/            # Application pages
│   │   ├── styles/           # Styles
│   │   └── ...
│   ├── __tests__/            # Frontend tests (Jest, Cypress)
│   ├── public/               # Static files (index.html, etc.)
│   ├── package.json          # Node.js dependencies
│   └── ...
├── docker/                   # Docker configs for different environments
│   ├── local/                # Local development
│   ├── production/           # Production
│   └── staging/              # Staging
├── notebooks/                # Jupyter notebooks for ML and data analysis
├── openapi.yaml              # OpenAPI schema for API documentation
└── README.md                 # Project documentation
```

---

## Documentation
- Swagger: `http://localhost:8000/swagger/`  (when backend is running)
- ML notebooks: `notebooks/` (folder)

---

## Branches
- `main` — stable version
- `staging` — development branch

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.



