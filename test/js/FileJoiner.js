/**
 *
 */
var Queue = (function () {
    function Queue() {
        var a = [];

        this.insert = function (e) {
            a.push(e);
        };

        this.remove = function () {
            return a.splice(0, 1)[0];
        };

        this.peek = function () {
            return a[0];
        };

        this.getList = function () {
            return a;
        };

        this.size = function () {
            return a.length;
        };

        this.empty = function () {
            return this.size() <= 0;
        };
    }

    return Queue;
})();

var FileJoiner = (function () {
    function FileJoiner(configFilePath, path) {
        var s = this;
        var qLink = new Queue();
        this.path = path;
        this.tree = null;

        var fs = require('fs');

        var data = fs.readFileSync(configFilePath, 'utf8');
        s.tree = JSON.parse(data).tree;

        this.write = function (path) {
            fs.writeFileSync(path, this.appendMultpleFiles());
        };

        this.appendMultpleFiles = function (string) {
            if (string === undefined)
                string = "";

            if (!qLink.empty()) {
                var p = qLink.remove();
                // console.log("path: " + p);
                // console.log("size: " + qLink.size());

                var data = fs.readFileSync(p, 'utf8');
                return s.appendMultpleFiles(string + data);
            } else {
                return string;
            }
        };

        this.load = function (debug, dir, tree) {
            var t = this.tree;

            if (tree !== undefined)
                t = tree;

            for (var dirs in t) {
                if (t instanceof Array) {
                    for (var i = 0; i < t.length; i++) {
                        var l;
                        if (dir[dir.length - 1] === "\\")
                            l = s.path + dir + t[i] + ".js";
                        else
                            l = s.path + dir + "\\" + t[i] + ".js";

                        qLink.insert(l);
                        if (debug)
                            console.log("Added to queue: " + l);
                    }
                    return;
                } else if (t instanceof Object) {
                    this.load(debug, "\\" + dirs, t[dirs]);
                }
            }
        };
    }

    return FileJoiner;
})();

module.exports = FileJoiner;