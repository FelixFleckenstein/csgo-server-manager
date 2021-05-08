#!/bin/bash
cd /opt/api/server_status
flask run & > null

cd /opt/api/user_management
flask run --port=5001 & > null

cd /opt/api/server_manager
flask run --port=5002 & > null

cd /opt/
yarn start