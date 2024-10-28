from flask import Flask, request, jsonify
from flask_cors import CORS
import whisper
from transformers import pipeline
import numpy as np
from pydub import AudioSegment
import io
import tempfile
import os

app = Flask(__name__)
CORS(app)

whisper_model = whisper.load_model("base")
summarizer = pipeline("summarization")

@app.route('/transcribe', methods=['POST'])
def transcribe_and_summarize():
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    audio_file = request.files['audio']
    
    try:
        # Save the uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix='.m4a') as temp_audio:
            audio_file.save(temp_audio.name)
            
        # Load the audio file using pydub
        audio = AudioSegment.from_file(temp_audio.name, format="m4a")
        
        # Convert to wav format (which Whisper handles well)
        audio = audio.set_frame_rate(16000)  # Whisper expects 16kHz
        audio = audio.set_channels(1)  # Convert to mono
        
        # Convert to numpy array
        audio_array = np.array(audio.get_array_of_samples(), dtype=np.float32)
        
        # Normalize
        audio_array = audio_array / np.max(np.abs(audio_array))
        
        # Clean up the temporary file
        os.unlink(temp_audio.name)
        
        # Transcribe audio using Whisper
        transcription = whisper_model.transcribe(audio_array)
        
        # Summarize transcription
        summary = summarizer(transcription['text'], max_length=50, min_length=25, do_sample=False)
        
        return jsonify({
            "transcription": transcription['text'],
            "summary": summary[0]['summary_text']
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)