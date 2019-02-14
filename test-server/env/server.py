from flask import render_template, Flask, request
from werkzeug import secure_filename
from flask_cors import CORS
from crossdomain import crossdomain

import connexion

# Create the application instance
app = Flask(__name__)
CORS(app)

# Read the swagger.yml file to configure the endpoints
#app.add_api('swagger.yml')

# Create a URL route in our application for "/"
@app.route('/upload')
def upload():
    """
    This function just responds to the browser ULR
    localhost:5000/
    :return:        the rendered template 'home.html'
    """
    return render_template('upload.html')

@app.route('/uploader', methods = ['GET', 'POST'])
@crossdomain(origin='*')
def upload_file():
	if request.method == 'POST':
		f = request.files['file']
		f.save(secure_filename(f.filename))
		return 'File uploaded successfully!'
		
		
# If we're running in stand alone mode, run the application
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
	
	