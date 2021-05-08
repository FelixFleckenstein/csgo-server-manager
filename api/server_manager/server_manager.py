from flask import Flask
from flask import request
import jwt
import os
import mariadb
import json
import subprocess

app = Flask(__name__)

config = {
	'host': '202.61.251.79',
	'port': 3307,
	'user': 'csgo-manager',
	'password': os.environ['CSGO_MYSQL_PASS'],
	'database': 'CSGO-MANAGER'
}

@app.route('/api/server-manager/createServer')
def createServer():
	try:
		sso = request.args.get('sso')
		payload = jwt.decode(sso, os.environ['JWT_PASS'], algorithms=['HS256'])
		isAdmin = 'admin' in payload and payload['admin']
	except:
		print("Error: Authentication failed")
		return ""

	if isAdmin:
		print("Hallo Felix")
		bashCommand = "docker run -d --name test debian"
		subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)

	return ""