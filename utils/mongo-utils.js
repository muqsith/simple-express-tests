const config = require('config'),
    Promise = require("bluebird"),
    result = require('./result.util'),
    LOG = require('./logger.util'),
    MongoClient = require('mongodb').MongoClient,
    { getErrorString } = require('./generic.util')
    ;

let db = undefined
    ;

function dbOnClose() {
    db = undefined;
    LOG.info('Mongodb connection closed.');
}


function dbOnOpen() {
    LOG.info('Mongodb connection opened.');
}


function getDBConnection() {
    return (
        new Promise((resolve, reject) => {
            if (db) {
                resolve(db);
            } else {
                MongoClient.connect(config.get('db').path, (err, _db) => {
                    if (err) {
                        let errorMessage = `Error occured while connecting to the database, ${getErrorString(err)}`;
                        LOG.error(errorMessage);
                        reject(new Error(errorMessage));
                    } else {
                        db = _db;
                        dbOnOpen();
                        db.on('close', dbOnClose);
                        LOG.info("Database connection successful");
                        resolve(db);
                    }        
                });
            }
        })
    );
}


module.exports = {
    getDBConnection
};