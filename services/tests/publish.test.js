
var mqtt = require("mqtt");

var client = mqtt.connect("http://localhost:3001");

client.publish("test", "4234234324242342");