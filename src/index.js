var express = require('express');
var gpio = require('rpi-gpio');
var app = express();

var pin = 7;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/led/toggle', function (req, res) {
    res.statusCode = 400;
    gpio.read(pin, function (err, value) {
        if (err) {
            console.log('failed to read pin value');
            res.end();
            return;
        }
        gpio.write(pin, !value, function (err) {
            if (err) {
                console.log('failed to write value');
                res.end();
                return;
            }
            console.log('light toggled');
            res.statusCode = 200;
            res.end();
        });
    });
});

gpio.setup(pin, gpio.DIR_OUT, function (err) {
    if (err) {
        console.log('failed to open gpio' + err);
        process.exit();
    }
    app.listen(3000);
});
