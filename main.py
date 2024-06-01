from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import pickle
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences

# Initialize the FastAPI application
app = FastAPI()

# Load the LSTM model and tokenizer
model = load_model("./ai/lstm-model.h5")
with open("./ai/tokenizer.pickle", "rb") as handle:
    tokenizer = pickle.load(handle)

# Maximum length of the text to be analyzed
MAX_SEQUENCE_LENGTH = 100

class SentimentRequest(BaseModel):
    comment: str

class SentimentResponse(BaseModel):
    sentiment: str

# Function to predict sentiment
def predict_sentiment(text):
    # Tokenize the text
    sequences = tokenizer.texts_to_sequences([text])
    # Pad sequences to the same length as MAX_SEQUENCE_LENGTH
    sequences = pad_sequences(sequences, maxlen=MAX_SEQUENCE_LENGTH)
    # Predict sentiment
    prediction = model.predict(sequences)[0][0]
    # Determine sentiment based on the prediction value
    sentiment = "positive" if prediction >= 0.5 else "negative"
    return sentiment

# Define endpoint for sentiment analysis
@app.post("/analyze-sentiment/", response_model=SentimentResponse)
async def analyze_sentiment(request: SentimentRequest):
    comment = request.comment
    if not comment:
        raise HTTPException(status_code=400, detail="Empty comment provided")
    sentiment = predict_sentiment(comment)
    return {"sentiment": sentiment}
