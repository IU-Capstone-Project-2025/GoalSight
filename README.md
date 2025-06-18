# GoalSight

A web page with an AI tool that aggregates and structures advanced football statistics from various sources, provides convenient visualizations and summaries of teams and tournaments, and allows you to quickly and intuitively find the information you need. The platform will become a central hub for all football analytics and will greatly simplify the work of coaches, journalists and fans.

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
│   │   │   ├── __init__.py
│   │   │   ├── admin.py    # Admin interface
│   │   │   ├── apps.py     # App configuration
│   │   │   ├── models.py   # Database models
│   │   │   ├── tests.py    # Tests
│   │   │   ├── urls.py     # URL routing
│   │   │   └── views.py    # Views
│   │   ├── teams/          # Teams Django app
│   │   │   ├── migrations/ # Database migrations
│   │   │   ├── __init__.py
│   │   │   ├── admin.py    # Admin interface
│   │   │   ├── apps.py     # App configuration
│   │   │   ├── models.py   # Database models
│   │   │   ├── tests.py    # Tests
│   │   │   ├── urls.py     # URL routing
│   │   │   └── views.py    # Views
│   │   ├── tournaments/    # Tournaments Django app
│   │   │   ├── migrations/ # Database migrations
│   │   │   ├── __init__.py
│   │   │   ├── admin.py    # Admin interface
│   │   │   ├── apps.py     # App configuration
│   │   │   ├── models.py   # Database models
│   │   │   ├── tests.py    # Tests
│   │   │   ├── urls.py     # URL routing
│   │   │   └── views.py    # Views
│   │   ├── manage.py       # Django management script
│   │   └── erd.png         # Entity Relationship Diagram
│   ├── Dockerfile          # Backend Docker configuration
│   ├── entrypoint.sh       # Docker entrypoint script
│   └── requirements.txt    # Python dependencies
│
├── model/                  # AI/ML model service
│   ├── main.py            # Model service entry point
│   ├── requirements.txt   # Model dependencies
│   └── Dockerfile         # Model Docker configuration
│
├── frontend/               # React frontend
│   ├── src/               # Source files
│   │   ├── components/    # React components
│   │   ├── App.tsx        # Main application component
│   │   └── index.tsx      # Application entry point
│   ├── public/            # Static files
│   ├── package.json       # Node.js dependencies
│   ├── tsconfig.json      # TypeScript configuration
│   ├── tailwind.config.js # Tailwind CSS configuration
│   └── postcss.config.js  # PostCSS configuration
│
├── docker-compose.yml     # Docker Compose configuration
├── openapi.yaml          # OpenAPI specification
└── README.md             # Project documentation
```

## Setup Instructions

1. Clone the repository
2. Install Docker and Docker Compose
3. Run the application:
   ```bash
   docker-compose up --build
   ```
4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5050

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
