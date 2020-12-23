const db = require('../db/config');
const SQL = require("sql-template-strings");

// const film = require('./film');

class Actor {
    constructor(data) {
        this.id = data.id
        this.name = data.name
    }

    static findById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let actorData = await db.run(SQL`SELECT * FROM actors WHERE id = ${id}`);
                let actor = new Actor(actorData.rows[0]);
                resolve(actor);
            } catch(err) {
                reject('Actor not found');
            }
        });
    }
}

module.exports = Actor;