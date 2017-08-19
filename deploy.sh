#!/usr/bin/bash
tar cf raspberry-pi.tar src/ package.json
scp raspberry-pi.tar pi@192.168.1.175:raspberry-pi/raspberry-pi.tar
ssh pi@192.168.1.175 '(pkill -9 node || true) && cd raspberry-pi && tar xf raspberry-pi.tar && npm install && sudo npm start'
