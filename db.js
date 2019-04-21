const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbname = "crud_mongodb";
const url = "mongodb://localhost:27017";
const mongoOptions = {useNewUrlParser : true};

const state = {
    db : null
};

const connect = (cb) => {
    // if state is not NULL
    // Means we have connection already, call our CB
    if (state.db)
        cb();
    else{
        MongoClient.connect(url, mongoOptions, (err,client) => {
            if (err)
                cb(err);
            else {
                state.db = client.db(dbname);
                cb();
            }
        });
    }
}

// returns OBJECTID object used to 
const getPrimaryKey = (_id) => {
    return ObjectID(_id);
}

// returns database connection 
const getDB = () => {
    return state.db;
}

module.exports = {getDB,connect,getPrimaryKey};