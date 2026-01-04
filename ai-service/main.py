from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, List, Optional
import uvicorn
import os
from datetime import datetime

from models.time_series import TimeSeriesForecaster
from models.nlp_model import NLPProcessor

app = FastAPI(
    title="Time Machines AI Service",
    description="AI/ML microservice for time-series forecasting and NLP tasks",
    version="1.0.0",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global model storage
models_cache = {}


class TrainRequest(BaseModel):
    modelId: str
    type: str
    data: Dict[str, Any]
    parameters: Optional[Dict[str, Any]] = {}


class PredictRequest(BaseModel):
    modelId: str
    modelPath: Optional[str] = None
    input: Dict[str, Any]
    type: str


class TrainResponse(BaseModel):
    modelId: str
    status: str
    metrics: Dict[str, float]
    modelPath: str


class PredictResponse(BaseModel):
    output: Dict[str, Any]
    confidence: Optional[float] = None


@app.get("/")
async def root():
    return {
        "service": "Time Machines AI Service",
        "status": "running",
        "timestamp": datetime.utcnow().isoformat(),
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}


@app.post("/train", response_model=TrainResponse)
async def train_model(request: TrainRequest):
    """Train a new AI/ML model"""
    try:
        model_path = f"./models/{request.modelId}"
        
        if request.type == "time-series":
            forecaster = TimeSeriesForecaster()
            metrics = await forecaster.train(
                data=request.data,
                parameters=request.parameters,
                model_path=model_path,
            )
            models_cache[request.modelId] = forecaster
            
        elif request.type == "nlp":
            nlp_processor = NLPProcessor()
            metrics = await nlp_processor.train(
                data=request.data,
                parameters=request.parameters,
                model_path=model_path,
            )
            models_cache[request.modelId] = nlp_processor
            
        else:
            raise HTTPException(status_code=400, detail=f"Unsupported model type: {request.type}")
        
        return TrainResponse(
            modelId=request.modelId,
            status="completed",
            metrics=metrics,
            modelPath=model_path,
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Training failed: {str(e)}")


@app.post("/predict", response_model=PredictResponse)
async def predict(request: PredictRequest):
    """Make predictions using a trained model"""
    try:
        # Try to get from cache first
        model = models_cache.get(request.modelId)
        
        if not model:
            # Load from disk if not in cache
            if request.type == "time-series":
                model = TimeSeriesForecaster()
                model.load(request.modelPath)
            elif request.type == "nlp":
                model = NLPProcessor()
                model.load(request.modelPath)
            else:
                raise HTTPException(status_code=400, detail=f"Unsupported model type: {request.type}")
            
            models_cache[request.modelId] = model
        
        result = await model.predict(request.input)
        
        return PredictResponse(
            output=result.get("output", {}),
            confidence=result.get("confidence"),
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


@app.get("/models")
async def list_models():
    """List all loaded models"""
    return {
        "models": list(models_cache.keys()),
        "count": len(models_cache),
    }


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
