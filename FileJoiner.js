/**
 * Created by Josue on 6/16/2017.
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
    function FileJoiner(configFilePath, path, ext) {
        var s = this;
        var ex = ext;
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

                if (ex !== undefined)
                    p = p.replace(/.js/, ex);

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
                        var l = s.path + dir + ((dir[dir.length - 1] === "\\") ? "" : "\\") + t[i] + (ex !== undefined ? ex : ".js");

                        qLink.insert(l);
                        if (debug)
                            console.log("Added to queue: " + l);
                    }
                    return;
                } else if (t instanceof Object) {
                    this.load(debug, ((dir === undefined) ? (s.path[s.path.length - 1] === "\\") ? "" : ("\\") : dir + "\\") + dirs, t[dirs]);
                }
            }
        };
    }

    return FileJoiner;
})();

module.exports = FileJoiner;

