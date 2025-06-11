# GoalSight

A web page with an AI tool that aggregates and structures advanced football statistics from various sources, provides convenient visualizations and summaries of teams and tournaments, and allows you to quickly and intuitively find the information you need. The platform will become a central hub for all football analytics and will greatly simplify the work of coaches, journalists and fans.

## Project Structure
```
GoalSight/
├── backend/                 # Django backend
│   ├── api/                # API application
│   │   ├── views.py        # API views
│   │   ├── urls.py         # API URL configuration
│   │   └── models.py       # Database models
│   ├── backend/            # Django project settings
│   │   ├── settings.py     # Project settings
│   │   └── urls.py         # Main URL configuration
│   ├── manage.py           # Django management script
│   └── requirements.txt    # Python dependencies
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
└── .gitignore            # Git ignore rules
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
