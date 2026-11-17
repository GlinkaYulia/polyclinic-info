require 'webrick'

server = WEBrick::HTTPServer.new(Port: 8000, DocumentRoot: __dir__)
trap('INT') { server.shutdown }
server.start