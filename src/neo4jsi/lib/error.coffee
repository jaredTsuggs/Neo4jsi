###
  Neo4jsi is Copyright (c) 2012 Logic Nation, Inc.
  This file is licensed under the AGPLv3 (http://www.gnu.org/licenses/agpl-3.0.html)
###

# # Error
# A general repository for Errors for the wrapper. There are some custom errors defined
# in here but this is mostly for the ERROR object which defines some basic (and generic)
# errors.
module.exports.ERROR = 
  noUrlDefined: new Error "No Url given, unabled to create a GraphDatabase object."
  invalidUrlType: new Error "Invalid URL type given, the URL must be a string."