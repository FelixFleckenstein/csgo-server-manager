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

@app.route('/api/server-manager/createServer', methods=['POST'])
def createServer():
	sso = request.args.get('sso')
	if isAdmin(sso):
		if request.method == "POST":
			serverName = request.form.get('serverName', '')
			serverLabel = serverName
			serverTyp = request.form.get('serverTyp', '')
			serverPW = request.form.get('serverPW', '')
			rconPW = request.form.get('rconPW', '')

			dockerImage = ""
			if serverTyp == '1':
				dockerImage = "tron/csgo-training:1.0"
			elif serverTyp == '3':
				dockerImage = "tron/csgo-dm:1.0"

			conn = mariadb.connect(**config)
			cur = conn.cursor()
			cur.execute("insert into server (name, typ, rcon_pw, password, public) values (?, ?, ?, ?, 0)", (serverName, serverTyp, rconPW, serverPW,))

			cur.execute("select id from server where name = ?", (serverName,))
			serverId = cur.fetchone()[0]
			
			cur.execute("select id, port, gotv_port, token from server_param where server_id is null")
			result = cur.fetchone()
			paramId = result[0]
			serverPort = result[1]
			serverTvPort = result[2]
			serverToken = result[3]

			cur.execute("update server_param set server_id = ? where id = ?", (serverId, paramId))

			conn.commit()

			bashCommand = 'docker run -d --net=host -e PORT=' + str(serverPort) + ' -e TV_PORT=' + str(serverTvPort) + ' -e TOKEN=' + str(serverToken) + ' -e CFG_HOST="' + str(serverLabel) + '" -e CFG_RCON="' + str(rconPW) + '" -e CFG_PASS="' + str(serverPW) + '" --name ' + str(serverName) + ' ' + dockerImage
			print("Startline: " + bashCommand)
			subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
			return {"connString": "connect 202.61.251.79:" + str(serverPort) + "; password " + str(serverPW)}

	return ""

def isAdmin(sso):
	try:
		payload = jwt.decode(sso, os.environ['JWT_PASS'], algorithms=['HS256'])
		isAdmin = 'admin' in payload and payload['admin']
		return isAdmin
	except:
		print("Error: Authentication failed")
		return False