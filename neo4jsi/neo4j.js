
/*
  Neo4jsi is Copyright (c) 2012 Logic Nation, Inc.
  This file is licensed under the AGPLv3 (http://www.gnu.org/licenses/agpl-3.0.html)
*/

(function() {
  var Database, ERR, Node, request;

  request = require("request");

  ERR = (require("./lib/error")).ERROR;

  Node = (require("./lib/node")).Node;

  Database = (function() {

    function Database(url) {
      var type,
        _this = this;
      if (url == null) throw ERR.noUrlDefined;
      type = typeof url;
      if (type !== "string") throw ERR.invalidUrlType;
      if ((url.charAt(url.length - 1)) !== "/") url += "/";
      this.dbUrl = "" + url + "db/data/";
      process.nextTick(function() {
        return request.get(_this.dbUrl, function(err, r, body) {
          var ext, property, value;
          if (err) {
            throw err;
          } else {
            if (typeof body === "string") body = JSON.parse(body);
            for (property in body) {
              value = body[property];
              _this["_" + property] = value;
              if (property === "neo4j_version") _this["version"] = value;
            }
            if (body.extensions != null) {
              ext = body.extensions;
              _this["hasCypher"] = ext.CypherPlugin != null ? true : false;
              return _this["hasGremlin"] = ext.CypherPlugin != null ? true : false;
            }
          }
        });
      });
      this;
    }

    Database.prototype.getNodeById = function(id, callback) {
      var _this = this;
      return process.nextTick(function() {
        var url;
        url = _this._node + ("/" + id);
        return request.get(url, function(err, r, body) {
          if (err) {
            return callback(err, null);
          } else {
            if (typeof body === "string") body = JSON.parse(body);
            return callback(null, new Node(body));
          }
        });
      });
    };

    Database.prototype.createNode = function(data) {};

    return Database;

  })();

  module.exports.Database = Database;

  module.exports.createDb = function(ip, port) {
    return new Database("http://" + ip + ":" + port + "/");
  };

}).call(this);
