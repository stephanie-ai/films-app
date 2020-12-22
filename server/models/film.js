const db = require('../db/config');
const SQL = require("sql-template-strings");

class Film {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.year = data.year
        this.genre = data.genre
        this.rating = data.rating
    }

    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const filmsData = await db.run(SQL`SELECT * FROM films;`);
                const films = filmsData.rows.map(film => new Film(film));
                resolve(films);
            } catch(err) {
                reject("Error retrieving films");
            }
        });
    }


}

module.exports = Film;