import os
import jwt

from flask import Flask
from flask import request
import mariadb
import hashlib

app = Flask(__name__)

config = {
#	'host': '127.0.0.1',
	'host': '202.61.251.79',
	'port': 3307,
	'user': 'csgo-manager',
	'password': os.environ['CSGO_MYSQL_PASS'],
	'database': 'CSGO-MANAGER'
}

@app.route('/api/authentication/login', methods=['POST'])
def login():
	if request.method == "POST":
		user = request.form.get('user', '')
		pw = hashlib.md5(bytearray(request.form.get('pass', '').encode()))

		conn = mariadb.connect(**config)
		cur = conn.cursor()
		cur.execute("select password from user where name = ?", (user,))

		result = cur.fetchone()

		if pw.hexdigest() == result[0]:
			return {"token": jwt.encode({'user': user, 'admin': '1'}, os.environ['JWT_PASS'], algorithm='HS256')}

	return ""