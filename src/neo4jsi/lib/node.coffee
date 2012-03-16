###
  Neo4jsi is Copyright (c) 2012 Logic Nation, Inc.
  This file is licensed under the AGPLv3 (http://www.gnu.org/licenses/agpl-3.0.html)
###

class module.exports.Node
  idRegex: /(?:node|relationship)\/([^\/]+)\/?/g
  __new: true
  constructor: (obj) ->
    if obj?
      @__load obj
  
  __load: (obj) ->      
    __new = false
    for property, value of obj
      if property is "data"
        @[property] = value
      else
        @["_#{property}"] = value
        
    if @_self?
      [all, id] = @idRegex.exec @_self
      @id = +id
          
  save: ->
    console.log "This will save your node"
    
  remove: ->
    console.log "This will delete your node."