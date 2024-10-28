# main.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import whisper
from transformers import pipeline

app = Flask(__name__)
CORS(app)  # Enable CORS if interacting with frontend

# Load Whisper and Summarizer models
whisper_model = whisper.load_model("base")
summarizer = pipeline("summarization")

@app.route('/transcribe', methods=['POST'])
def transcribe_and_summarize():
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    audio_file = request.files['audio']
    # Transcribe audio using Whisper
    transcription = whisper_model.transcribe(audio_file)

    # Summarize transcription using Hugging Face
    summary = summarizer(transcription['text'], max_length=50, min_length=25, do_sample=False)

    return jsonify({
        "transcription": transcription['text'],
        "summary": summary[0]['summary_text']
    })

if __name__ == '__main__':
    app.run(debug=True)
