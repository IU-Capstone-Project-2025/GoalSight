from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class PredictionRequest(BaseModel):
    home_team: str
    away_team: str


@app.get("/")
def root():
    return {"message": "ML Service Stub is running!"}


@app.post("/predict")
def predict(data: PredictionRequest):
    return {
        "prediction": data.home_team,
        "confidence": 0.88,
    }

