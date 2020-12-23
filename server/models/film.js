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

    static findById(id) {
        return new Promise (async (resolve, reject) => {
            try {
                let filmData = await db.run(SQL`SELECT * FROM films WHERE id = ${id};`);
                let film = new Film(filmData.rows[0]);
                resolve(film);
            } catch(err) {
                reject('Film not found');
            }
        })
    }

    static create(name, year, genre, rating) {
        return new Promise (async (resolve, reject) => {
            try {
                let filmData = await db.run(SQL`INSERT INTO films (name, year, genre, rating) VALUES (${name}, ${year}, ${genre}, ${rating}) RETURNING *;`);
                let newFilm = new Film(filData.rows[0]);
                resolve(newFilm);
            } catch(err) {
                reject('Error retrieving the new film you tried to add');
            }
        });
    }

    update(updateData) {
        return new Promise (async (resolve, reject) => {
            try {
                let updatedFilmData = await db.run(SQL`UPDATE films SET rating = rating + 1 WHERE id = ${this.id} RETURNING *;`);
                let updatedFilm = new Film(updatedFilmData.rows[0]);
                resolve(updatedFilm);
            } catch(err) {
                reject('Error updating film');
            }
        })
    }

    destroy() {
        return new Promise(async(resolve, reject) => {
            try {
                await db.run(SQL`DELETE FROM films WHERE id = ${this.id};`);
                resolve('Film was deleted');
            } catch(err) {
                reject('Film could not be deleted');
            }
        })
    }

}

module.exports = Film;