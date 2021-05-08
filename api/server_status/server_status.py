from flask import Flask
from flask import request
import valve.rcon
import jwt
import os
import mariadb
import traceback
import json

app = Flask(__name__)

config = {
	'host': '202.61.251.79',
	'port': 3307,
	'user': 'csgo-manager',
	'password': os.environ['CSGO_MYSQL_PASS'],
	'database': 'CSGO-MANAGER'
}

@app.route('/api/server-status/getServer')
def getServerList():
	conn = mariadb.connect(**config)
	cur = conn.cursor()
	cur.execute("select svr.name, par.ip, par.port, par.gotv_port, svr.rcon_pw from server svr join server_param par on svr.id = par.server_id")
	
	data=[]
	for (name, ip, port, gotv_port, rcon_pw) in cur:
		#print(f"First Name: {name}, Last Name: {password}")
		data.append({'name': name, 'IP': ip, 'port': port, 'gotvPort': gotv_port, 'rconPW': rcon_pw})

	jsonData = json.dumps(data)
	print(jsonData)

	return jsonData

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