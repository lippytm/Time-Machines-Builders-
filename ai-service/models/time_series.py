import numpy as np
import pandas as pd
from typing import Dict, Any, List
import os
import json


class TimeSeriesForecaster:
    """Time series forecasting using simple statistical methods and TensorFlow"""
    
    def __init__(self):
        self.model = None
        self.scaler = None
        self.history = []
        
    async def train(self, data: Dict[str, Any], parameters: Dict[str, Any], model_path: str) -> Dict[str, float]:
        """Train time series forecasting model"""
        try:
            # Extract time series data
            if isinstance(data, dict) and 'values' in data:
                values = data['values']
            else:
                values = list(data.values()) if isinstance(data, dict) else data
            
            # Convert to numpy array
            series = np.array(values, dtype=float)
            
            # Simple moving average model for demonstration
            window_size = parameters.get('window_size', 5)
            
            # Calculate moving average
            moving_avg = []
            for i in range(len(series) - window_size):
                window = series[i:i + window_size]
                moving_avg.append(np.mean(window))
            
            # Calculate metrics (MAE on training data)
            actual = series[window_size:]
            predicted = np.array(moving_avg)
            mae = np.mean(np.abs(actual - predicted))
            rmse = np.sqrt(np.mean((actual - predicted) ** 2))
            
            # Store model parameters
            self.model = {
                'type': 'moving_average',
                'window_size': window_size,
                'last_values': series[-window_size:].tolist(),
            }
            
            # Save model
            os.makedirs(os.path.dirname(model_path) if os.path.dirname(model_path) else '.', exist_ok=True)
            with open(f"{model_path}.json", 'w') as f:
                json.dump(self.model, f)
            
            return {
                'mae': float(mae),
                'rmse': float(rmse),
                'samples': len(series),
            }
            
        except Exception as e:
            raise Exception(f"Training failed: {str(e)}")
    
    def load(self, model_path: str):
        """Load trained model"""
        with open(f"{model_path}.json", 'r') as f:
            self.model = json.load(f)
    
    async def predict(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Make predictions"""
        try:
            steps = input_data.get('steps', 1)
            
            # Get last known values
            last_values = np.array(self.model['last_values'])
            window_size = self.model['window_size']
            
            predictions = []
            current_values = last_values.copy()
            
            for _ in range(steps):
                # Predict next value as mean of window
                next_val = np.mean(current_values[-window_size:])
                predictions.append(float(next_val))
                
                # Update window
                current_values = np.append(current_values[1:], next_val)
            
            return {
                'output': {
                    'predictions': predictions,
                    'steps': steps,
                },
                'confidence': 0.85,  # Simplified confidence
            }
            
        except Exception as e:
            raise Exception(f"Prediction failed: {str(e)}")
