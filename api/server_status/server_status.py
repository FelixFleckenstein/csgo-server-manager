from flask import Flask
from flask import request
import valve.rcon
import jwt
import os
import traceback

app = Flask(__name__)

@app.route('/api/server-status/status')
def getServerStatus():
	try:
		try:
			sso = request.args.get('sso')
			payload = jwt.decode(sso, os.environ['JWT_PASS'], algorithms=['HS256'])
			isAdmin = 'admin' in payload and payload['admin']
		except:
			print("Error: Authentication failed")

		if isAdmin:
			ip = request.args.get('ip')
			port = request.args.get('port')
			password = request.args.get('pw')
			name = request.args.get('name')
			goTV = request.args.get('goTV')

			server_address = (str(ip), int(str(port)))

			status = []
			hostname = ""
			aktMap = ""
			players = ""
			uptime = ""

			try:
				with valve.rcon.RCON(server_address, password) as rcon:
					uptime = int(list(filter(None, rcon("stats").split('\n')[1].split(' ')))[3])/60
					status = rcon("status").split('\n')
			except:
				print("Error: Server nicht erreichbar")

		
			for x in status:
				if 'hostname' in x:
					hostname = x.split(':')[1].strip()
				elif 'map' in x:
					aktMap = x.split(':')[1].strip()
				elif 'players' in x:
					players = x.split(':')[1].strip()

			return {"hostname": hostname, "map": aktMap, "players": players, "uptime": uptime, "name": name, "port": port, "goTV": goTV}
	except:
		return {"hostname": "ERROR"}