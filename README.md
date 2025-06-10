# GoalSight

A web application for goal tracking and visualization.

## Project Structure

```
├── backend/           # Flask backend
│   ├── app.py        # Main application file
│   ├── requirements.txt
│   └── ml/          # Machine learning modules
├── frontend/         # React frontend
│   ├── src/
│   └── package.json
├── docker-compose.yml
└── README.md
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
   - Backend API: http://localhost:5000

## Development

### Backend
- Python 3.8+
- Flask
- Machine learning libraries (numpy, pandas, scikit-learn)

### Frontend
- Node.js
- React
- Material-UI
- Axios for API calls