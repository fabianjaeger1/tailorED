from flask import Flask, jsonify, request
import pandas as pd
from io import BytesIO
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import urllib.parse

import openai
import subprocess
import logging

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'audio'  # Define the upload folder
CORS(app)

# Ensure audio folder exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Relevant directories
audio_dir = "./flaskr/audio/"
txt_dir = "./flaskr/audio/"

# Load the OpenAI API key from a file
with open("./flaskr/key.txt", "r") as file:
    key = file.read().strip()

openai.api_key = key

# from OpenSSL import SSL
# context = SSL.Context(SSL.PROTOCOL_TLS)
# context.use_privatekey_file('server.key')
# context.use_certificate_file('server.crt')

# test route
@app.route('/')
def test():
    return "Test"


@app.route('/', methods=['POST', 'GET'])
def get_data():
    request.files["file"].save('./audio.ogg')
    print("FILE CLOSED")

@app.route('/members', methods=['GET'])
def members():
    return jsonify({'members': ['member1', 'member2', 'member3']})

# Method to convert the webm file to mp3

def convert_video_to_audio(video_file_path):
    # print("called")
    audio_filename = video_file_path[:-5] + ".mp3"
    audio_filename = "./audio/" + audio_filename
    audio_filename = os.path.join('audio', audio_filename)
    video_file_path = os.path.join('audio', video_file_path)
    # print(os.lsdir("./audio"))
    # print(os.getcwd())
    command = "ffmpeg -i {} -vn -ar 44100 -ac 2 -b:a 192k {}".format(video_file_path, audio_filename)
    subprocess.call(command, shell=True)

@app.route('/upload_audio', methods=['POST'])
def upload_audio():
    if 'file_from_react' not in request.files:
        return jsonify({'status': 'No file part'})
    
    file = request.files['file_from_react']
    if file.filename == '':
        return jsonify({'status': 'No selected file'})

    if file:
        print("Save File")
        filename = secure_filename(file.filename)
        # file.save("TEST.ogg")        
        print(filename)
        convert_video_to_audio(filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return jsonify({'status': 'File uploaded successfully'})

@app.route('/upload_file', methods=["POST"])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'status': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'status': 'No selected file'}), 400
    if file:
        # Save the file to the server's filesystem
        # filepath = f"./uploads/{file.filename}"
        filepath = f'{file.filename}'
        print("save file")
        file.save(filepath)
        return jsonify({'status': 'File uploaded successfully'}), 200
    

# def upload_file():
#     print("Uploading file")
#     d = {}
#     try:
#         file = request.files['file_from_react']
#         filename = file.filename
#         print(f"Uploading file {filename}")
#         file_bytes = file.read()
#         file_content = BytesIO(file_bytes).readlines()
#         print(file_content)
#         d['status'] = '1'
        
#     except Exception as e:
#         print(f"Couldn't upload file {e}")
#         d['status'] = '0'
#     json_data = jsonify(d)
#     with open('audiotest.json', 'w') as f:
#         f.write(json_data)
#     return jsonify(d)

# @app.route("/company-names")
# def company_names():
#     df = pd.read_csv('../all_factors.csv')

#     return list(df['companyLongName'].unique())

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

if __name__ == "__main__":
    # app.run(debug=True, ssl_context=('cert.pem', 'key.pem'), port=5003, host = "127.0.0.1")
    app.run(debug=True, port=5003, host = "127.0.0.1")
    # app.run(debug=True, ssl_context='adhoc', port=5002)
#     # app.run(debug=True, port=3000, threaded=True)
#     # app.run(ssl_context='adhoc', port=3000, debug=True, threaded=True)
#     # app.run(ssl_context=("cert.pem", "key.pem"), debug=False, port=5002)
#     # app.run(ssl_context=('example.com.crt', 'example.com.key'), debug = True, host='127.0.0.1', port=5002)
#     app.run(ssl_context='adhoc', port=5002, host = "127.0.0.1", debug)
