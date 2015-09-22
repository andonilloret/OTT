pm2 = require 'pm2'

pm2.connect ->
  pm2.start {
    script: 'app.js'
    exec_mode: 'cluster'
    instances: 4
    max_memory_restart: '100M'
  }, (err, apps) ->
    pm2.disconnect()