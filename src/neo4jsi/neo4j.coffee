###
  Neo4jsi is Copyright (c) 2012 Logic Nation, Inc.
  This file is licensed under the AGPLv3 (http://www.gnu.org/licenses/agpl-3.0.html)
###

# # Neo4j Improved (neo4ji)
# This is an improved wrapper for the Neo4j Database written from the ground up
# and based on the specifications in the Neo4j 1.6.1 REST API documentation.
#
# The purpose of this wrapper is to provide a complete wrapper for the Neo4j
# REST API for Node.js. This includes a way to create and/or manipulate:
#
#   Nodes (Incomplete)
#   Relationships (Incomplete)
#   Indexes (Incomplete)
#   Cypher Queries (Incomplete)
#   Traversals (Incomplete)
#
# This library is dependant upon "Request" (https://github.com/mikeal/request) by
# Mikeal.
request = (require "request")
ERR = (require "./lib/error").ERROR
Node = (require "./lib/node").Node

class Database
  # Constructs a new GraphDatabase object.
  constructor: (url) ->
    throw ERR.noUrlDefined unless url? 
    type = typeof url
    throw ERR.invalidUrlType unless type is "string"
    if (url.charAt url.length - 1) isnt "/"
      url += "/"
    @dbUrl = "#{url}db/data/"
    process.nextTick =>
      request.get @dbUrl, (err, r, body) =>
        if err
          throw err
        else
          if typeof body is "string"
            body = JSON.parse body
          for property, value of body
            @["_#{property}"] = value
            if property is "neo4j_version"
              @["version"] = value
          if body.extensions?
            ext = body.extensions
            @["hasCypher"] = if ext.CypherPlugin? then true else false
            @["hasGremlin"] = if ext.CypherPlugin? then true else false
    @
    
  getNodeById: (id, callback) ->
    process.nextTick =>
      url = @_node + "/#{id}"
      request.get url, (err, r, body) =>
        if err
          callback err, null
        else
          if typeof body is "string"
            body = JSON.parse body
          callback null, (new Node body)
  
  createNode: (data) ->
    # TODO: Implement
            
module.exports.Database = Database
module.exports.createDb = (ip, port) ->
  new Database "http://#{ip}:#{port}/"