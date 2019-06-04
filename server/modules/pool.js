const pg = require('pg');
const url = require('url');

let config = {};

if(process.env.DATABASE_URL) {
    const params = url.parse(process.env.DATABASE_URL);
    config = {
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: true, 
        max: 10,
        idleTimeoutMillis: 30000
    };
} else {
    config = {
        host: 'localhost',
        port: 5432,
        database: 'employee-scheduler',
        max: 10,
        idleTimeoutMillis: 30000
    };
}

const pool = new pg.Pool(config);

pool.on('connect', () => {
    console.log('Database connected');
})

pool.on('error', error => {
    console.log('Error connecting to database:', error);
    process.exit(-1);
})

module.exports = pool;