
/*
  Neo4jsi is Copyright (c) 2012 Logic Nation, Inc.
  This file is licensed under the AGPLv3 (http://www.gnu.org/licenses/agpl-3.0.html)
*/

(function() {

  module.exports.Node = (function() {

    Node.prototype.idRegex = /(?:node|relationship)\/([^\/]+)\/?/g;

    Node.prototype.__new = true;

    function Node(obj) {
      if (obj != null) this.__load(obj);
    }

    Node.prototype.__load = function(obj) {
      var all, id, property, value, __new, _ref;
      __new = false;
      for (property in obj) {
        value = obj[property];
        if (property === "data") {
          this[property] = value;
        } else {
          this["_" + property] = value;
        }
      }
      if (this._self != null) {
        _ref = this.idRegex.exec(this._self), all = _ref[0], id = _ref[1];
        return this.id = +id;
      }
    };

    Node.prototype.save = function() {
      return console.log("This will save your node");
    };

    Node.prototype.remove = function() {
      return console.log("This will delete your node.");
    };

    return Node;

  })();

}).call(this);
