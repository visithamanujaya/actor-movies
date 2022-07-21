const { Client } = require('pg')

let dbClient;

const getClient = async () => {
    if(dbClient){
        return dbClient;
    } else {
        dbClient = new Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: 5432,
        })
        await dbClient.connect();
        return dbClient;
    }
}

const executeQuery = async (query, params) => {
        if(params == undefined) {
            params = [];
        }
        try {
            const client = await getClient();
            const result = await client.query(query, params);
            return result;
        } catch (err) {
            console.log(`Execution of the query ${query} with ${params} failed - ${err.message}`);
            throw err;
        }
}

exports.executeSelect = async (query, params) => {
    try {
        const res = await executeQuery(query, params);
        return res['rows'];
    } catch (err){
        throw err;
    }
}

exports.executeInsert = async (query, params) => {
    try {
        const res = await executeQuery(query, params);
        return res;
    } catch (err){
        throw err;
    }
}
