# GoalSight

A web page with an AI tool that aggregates and structures advanced football statistics from various sources, provides convenient visualizations and summaries of teams and tournaments, and allows you to quickly and intuitively find the information you need. The platform will become a central hub for all football analytics and will greatly simplify the work of coaches, journalists and fans.

[Link to our deploy](http://goalsight.ru)

## Project Structure
```
GoalSight/
├── backend/                 # Django backend
│   ├── goalsight/          # Django project
│   │   ├── goalsight/      # Project settings
│   │   │   ├── __init__.py
│   │   │   ├── asgi.py     # ASGI configuration
│   │   │   ├── settings.py # Project settings
│   │   │   ├── urls.py     # Main URL configuration
│   │   │   └── wsgi.py     # WSGI configuration
│   │   ├── matches/        # Matches Django app
│   │   │   ├── migrations/ # Database migrations
│   │   │   ├── management/ # Custom management commands
│   │   │   │   └── commands/
│   │   │   │       ├── fetch_matches.py    # Import matches from external sources
│   │   │   ├── __init__.py
│   │   │   ├── admin.py    # Admin interface
│   │   │   ├── apps.py     # App configuration
│   │   │   ├── models.py   # Database models
│   │   │   ├── tests.py    # Tests
│   │   │   ├── urls.py     # URL routing
│   │   │   └── views.py    # Views
│   │   ├── teams/          # Teams Django app
│   │   │   ├── migrations/ # Database migrations
│   │   │   ├── management/ # Custom management commands
│   │   │   │   └── commands/
│   │   │   │       ├── import_teams.py     # Import teams from external sources
│   │   │   ├── __init__.py
│   │   │   ├── admin.py    # Admin interface
│   │   │   ├── apps.py     # App configuration
│   │   │   ├── models.py   # Database models
│   │   │   ├── tests.py    # Tests
│   │   │   ├── urls.py     # URL routing
│   │   │   └── views.py    # Views
│   │   ├── tournaments/    # Tournaments Django app
│   │   │   ├── migrations/ # Database migrations
│   │   │   ├── management/ # Custom management commands
│   │   │   │   └── commands/
│   │   │   │       ├── import_tournaments.py # Import tournaments from external sources
│   │   │   ├── __init__.py
│   │   │   ├── admin.py    # Admin interface
│   │   │   ├── apps.py     # App configuration
│   │   │   ├── models.py   # Database models
│   │   │   ├── tests.py    # Tests
│   │   │   ├── urls.py     # URL routing
│   │   │   └── views.py    # Views
│   │   ├── predictions/    # ML service integration
│   │   ├── ml_models/      # ML models and artifacts
│   │   │   ├── model.pkl              # Main ML model
│   │   │   ├── best_logistic_model.pkl# Alternative/best model
│   │   │   ├── scaler.pkl             # Feature scaler
│   │   │   ├── features.json          # Feature list
│   │   │   ├── class_mapping.json     # Class mapping
│   │   │   └── metrics.json           # Model metrics
│   │   ├── manage.py       # Django management script
│   │   └── erd.png         # Entity Relationship Diagram
│   ├── entrypoint.sh       # Docker entrypoint script
│   └── requirements.txt    # Python dependencies
│
├── notebooks/              # Jupyter notebooks for ML/data analysis
│   └── ML_part_data.ipynb
├── frontend/               # React frontend
│   ├── __tests__/          # Frontend tests
│   │   ├── api/            # API integration tests for frontend (Jest)
│   │   ├── component_tests/# Component unit tests for frontend (Jest)
│   │   ├── cypress/        # End-to-end (E2E) tests (Cypress)
│   │   │   ├── e2e/        # E2E test specifications
│   │   │   └── support/    # Cypress support files
│   │   └── mocks/          # Mock server and test utilities
│   ├── src/                # Source files
│   │   ├── pages/          # Application pages
│   │   ├── components/     # Reusable components
│   │   │   ├── navigation/ # Navigation components
│   │   │   └── ui/         # UI components
│   │   │       ├── match_forecast/    # Match forecast components
│   │   │       ├── nextMatch/         # Next match components
│   │   │       ├── team_item/         # Team item components
│   │   │       ├── team_stats/        # Team statistics components
│   │   │       └── upcomingMatches/   # Upcoming matches components
│   │   ├── styles/         # Global styles and themes
│   │   ├── index.tsx       # Application entry point
│   │   ├── setupTests.ts   # Test setup configuration
│   │   └── react-app-env.d.ts # React app type definitions
│   ├── public/             # Static files
│   ├── package.json        # Node.js dependencies
│   ├── package-lock.json   # Locked Node.js dependencies
│   ├── tsconfig.json       # TypeScript configuration
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   ├── postcss.config.js   # PostCSS configuration
│   ├── jest.setup.ts       # Jest test setup configuration
│   ├── jest.config.components.js # Jest configuration for component tests
│   ├── jest.config.api.js  # Jest configuration for API integration tests
│   └── cypress.config.ts   # Cypress E2E testing configuration
│
├── docker/                 # Docker configurations for different environments
│   ├── local/
│   │   ├── Dockerfile.backend
│   │   ├── Dockerfile.frontend
│   │   ├── docker-compose.yml
│   │   └── .env.gpg
│   ├── production/
│   │   ├── Dockerfile.backend
│   │   ├── Dockerfile.frontend
│   │   ├── Dockerfile.nginx
│   │   ├── docker-compose.yml
│   │   └── nginx/
│   │       └── nginx.conf
│   └── staging/
│       ├── Dockerfile.backend
│       ├── Dockerfile.frontend
│       ├── Dockerfile.nginx
│       ├── docker-compose.yml
│       └── nginx/
│           └── nginx.conf
│
├── .github/                # GitHub workflows and issue templates
│   └── ...
├── openapi.yaml            # OpenAPI specification
└── README.md               # Project documentation
```

## Backend Setup & Usage

### Requirements
- Python 3.11+
- Django 5.0.2
- Django REST framework

### Local Development (without Docker)

```bash
cd backend/goalsight
python -m venv venv
source venv/bin/activate
pip install -r ../requirements.txt
```

#### Apply migrations and load initial data
```bash
python manage.py migrate
python manage.py import_teams
python manage.py import_tournaments
python manage.py fetch_matches
```

#### Run development server
```bash
python manage.py runserver
```

### Running Backend Tests
```bash
python manage.py test
```

### ML Models
The `ml_models/` directory contains serialized ML models, scalers, and class mappings used for match outcome predictions.

### Jupyter Notebooks
The `notebooks/` directory contains Jupyter notebooks for data analysis and building ML models (e.g., `ML_part_data.ipynb`).

## Frontend testing

Running tests for the frontend parts: react components tests(unit tests), integration tests for API endpoints, and end-to-end tests

```bash
cd frontend
npm run test:components
npm run test:api
npm run test:e2e
```
Gettins code coverage report for component and API integration tests

```bash
npm run test:coverage:components
npm run test:coverage:api
```

## Setup Instructions

1. Clone the repository
2. Install Docker and Docker Compose
3. Go to docker/local
4. Run the application:
   ```bash
   docker-compose up --build
   ```
5. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## Development

### Backend
- Python 3.11+
- Django 5.0.2
- Django REST framework

### Frontend
- Node.js 18
- React 18
- TypeScript
- Tailwind CSS
- Axios for API calls

## API Endpoints

### Django Endpoints
- `GET /api/`: Returns API data

## Docker Configuration
- Backend runs on port 8000
- Frontend runs on port 3000
- Both services are connected through a Docker network

## 📘 API Documentation

▶️ [View API Docs via Swagger UI](https://editor.swagger.io/?url=https://raw.githubusercontent.com/IU-Capstone-Project-2025/GoalSight/refs/heads/main/openapi.yaml)

## Decrypting .env.gpg

Some environments (e.g., docker/local) use an encrypted environment file `.env.gpg` to store sensitive configuration variables (API keys, secrets, etc.).

To decrypt `.env.gpg` and obtain the `.env` file, you need access to the GPG private key used for encryption.

### Steps to decrypt:

1. **Obtain the private key** (ask @arino4ka_myr).
2. **Go to docker/local**
   ```bash
   cd docker/local
   ```
3. **Decrypt the file**:
   ```bash
   gpg --decrypt .env.gpg > .env
   ```
> **Note:** Never commit decrypted `.env` files to version control!
