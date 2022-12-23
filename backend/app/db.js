const Pool = require('pg').Pool
exports.pool = new Pool({
  user: 'developer',
  host: '49.36.90.82',
  database: 'home-inventory',
  password: 'developer',
  port: 5432,
})


