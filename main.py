from fastapi import FastAPI, Request
from pydantic import BaseModel
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pickle

# Load the model and tokenizer
model = load_model('./ai/sentiment_model.h5')
with open('./ai/tokenizer.pkl', 'rb') as handle:
    tokenizer = pickle.load(handle)

# Define FastAPI app
app = FastAPI()

# Define a request model
class CommentRequest(BaseModel):
    content: str

@app.post("/predict")
async def predict_sentiment(request: CommentRequest):
    # Preprocess the input
    sequences = tokenizer.texts_to_sequences([request.content])
    padded_sequences = pad_sequences(sequences, maxlen=200)
    
    # Make prediction
    prediction = model.predict(padded_sequences)
    sentiment = np.argmax(prediction, axis=1)[0]
    
    # Map prediction to sentiment label
    sentiment_label = 'Positive' if sentiment == 1 else 'Negative'
    
    return {"sentiment": sentiment_label}
