const sqlite3 = require('sqlite3').verbose();

let dbClient;

const getClient = () => {
    if(dbClient){
        return dbClient;
    } else {
        dbClient = new sqlite3.Database('./actor.db', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.log("Getting error " + err);
                return;
            }
        });
        return dbClient;
    }
}

exports.run = (query, params) => {
    return new Promise((resolve, reject) => {
        const db = getClient();
        db.run(query, params,
            (err) => {
                if(err) {
                    console.log(`Error executing run query - ${query} with values - ${params}`);
                    reject(err.message)
                } else    {
                    resolve(true)
                }
            })
    })
}

exports.all = (query, params) => {
    return new Promise((resolve, reject) => {
        if(params == undefined) {
            params=[];
        }
        const db = getClient();
        db.all(query, params, (err, rows) => {
            if(err) {
                console.log(`Error executing all query - ${query} with values - ${params}`);
                reject("Read error: " + err.message)
            } else {
                resolve(rows)
            }
        })
    })
}
