from flask import Flask
import pandas as pd
from flask_cors import CORS
import urllib.parse

import openai
import subprocess
import logging

app = Flask(__name__)
CORS(app)

# Relevant directories
audio_dir = "./flaskr/audio/"
txt_dir = "./flaskr/audio/"

# Load the OpenAI API key from a file
with open("./flaskr/key.txt", "r") as file:
    key = file.read().strip()

openai.api_key = key


@app.route("/company-names")
def company_names():
    df = pd.read_csv('../all_factors.csv')

    return list(df['companyLongName'].unique())

@app.route("/company-esg/<company>")
def company_esg(company):
    e = pd.read_csv('../environmental_factors.csv')
    s = pd.read_csv('../social_factors.csv')
    g = pd.read_csv('../governance_factors.csv')
    parsedCompanyName = urllib.parse.unquote(company)
    return {
        'environmental': float(e[e['companyLongName'] == parsedCompanyName]['environmentalFactorAverage'].iloc[0]),
        'social': float(s[s['companyLongName'] == parsedCompanyName]['socialFactorAverage'].iloc[0]),
        'governance': float(g[g['companyLongName'] == parsedCompanyName]['governanceFactorAverage'].iloc[0])
    }

@app.route("/company-esg/<company>")
def convert_audio(input_file):
    """
    Convert an audio file to Opus format using FFmpeg.
    input_file: input audio file (mp3)
    output_file: output audio file (.ogg)
    """

    output_file = audio_dir + input_file.replace(".mp3", ".ogg")

    # Define the FFmpeg command as a list of arguments
    command = [
        'ffmpeg',
        '-i', audio_dir + input_file,   # Input file
        '-vn',              # No video
        '-map_metadata', '-1',  # Strip metadata
        '-ac', '1',         # Set audio channels to 1 (mono)
        '-c:a', 'libopus',  # Codec for audio: Opus
        '-b:a', '12k',      # Bitrate for audio: 12 kbps
        '-application', 'voip',  # Optimize for VoIP
        output_file         # Output file
    ]
    
    try:
        subprocess.run(command, check=True)
        print(f"File converted successfully: {output_file}")
    except subprocess.CalledProcessError as e:
        print(f"An error occurred while converting the file: {e}")
    


@app.route("/company-esg/<company>")
def transcribe_audio(audio_file):
    
    response = openai.audio.transcriptions.create(
        model="whisper-1",
        file=open(audio_file, "rb")
    )
    response = response.text

    transcription_file = txt_dir + audio_file.replace(".ogg", ".txt")

    with open(transcription_file, "w") as file:
        file.write(response)

    return response