
/*
  Neo4jsi is Copyright (c) 2012 Logic Nation, Inc.
  This file is licensed under the AGPLv3 (http://www.gnu.org/licenses/agpl-3.0.html)
*/

(function() {

  module.exports.ERROR = {
    noUrlDefined: new Error("No Url given, unabled to create a GraphDatabase object."),
    invalidUrlType: new Error("Invalid URL type given, the URL must be a string.")
  };

}).call(this);
