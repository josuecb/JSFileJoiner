/**
 * Created by Josue on 5/18/2017.
*/
var path = __dirname.split("test")[0];
var f = require("./FileJoiner");

var al = new f(path + "test\\config.json", path + "test");
al.load(true);
al.write(__dirname + "\\test.js");

