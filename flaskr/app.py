from flask import Flask, jsonify, request
import pandas as pd
from io import BytesIO
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import urllib.parse

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'audio/'  # Define the upload folder
CORS(app)

# from OpenSSL import SSL
# context = SSL.Context(SSL.PROTOCOL_TLS)
# context.use_privatekey_file('server.key')
# context.use_certificate_file('server.crt')

# test route
@app.route('/')
def test():
    return "Test"

@app.route('/members', methods=['GET'])
def members():
    return jsonify({'members': ['member1', 'member2', 'member3']})

@app.route('/upload_audio', methods=['POST'])
def upload_audio():
    if 'file_from_react' not in request.files:
        return jsonify({'status': 'No file part'})
    
    file = request.files['file_from_react']
    if file.filename == '':
        return jsonify({'status': 'No selected file'})

    if file:
        filename = secure_filename(file.filename)
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
        filepath = f"./uploads/{file.filename}"
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


if __name__ == "__main__":
    # app.run(debug=True, ssl_context=('cert.pem', 'key.pem'), port=5003, host = "127.0.0.1")
    app.run(debug=True, ssl_context=('adhoc'), port=5003, host = "127.0.0.1")
    # app.run(debug=True, ssl_context='adhoc', port=5002)
#     # app.run(debug=True, port=3000, threaded=True)
#     # app.run(ssl_context='adhoc', port=3000, debug=True, threaded=True)
#     # app.run(ssl_context=("cert.pem", "key.pem"), debug=False, port=5002)
#     # app.run(ssl_context=('example.com.crt', 'example.com.key'), debug = True, host='127.0.0.1', port=5002)
#     app.run(ssl_context='adhoc', port=5002, host = "127.0.0.1", debug)

