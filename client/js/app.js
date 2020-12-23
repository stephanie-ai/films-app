// ********************************************
// SETUP
const btn = document.querySelector('#msgBtn');
const form = document.querySelector('#add-film-form');
const filmsList = document.querySelector('table');

// buttons and event listeners
btn.addEventListener('click', getMessage);
form.addEventListener('submit', submitFilm);

// fetch all films as soon as app is loaded
showAllFilms();

// ********************************************

// FILMS FLOW

// index
function showAllFilms() {
    fetch('http://localhost:3000/films')
        .then(r => r.json())
        .then(appendFilms)
        .catch(console.warn)
};

function submitFilm(e) {
    e.preventDefault();

    const filmData = {
        name: e.target.name.value,
        year: e.target.year.value,
        genre: e.target.genre.value,
        rating: e.target.rating.value
    };

    const options = {
        method: 'POST',
        body: JSON.stringify(filmData),
        headers: { "Content-Type": "application/json" }
    };

    fetch('http://localhost:3000/films', options)
        .then(r => r.json())
        .then(appendFilm)
        .then(() => e.target.reset())
        .catch(console.warn)
};

function updateFilm(id, tr) {
    const options = {
        method: 'PATCH'
    };
    fetch(`http://localhost:3000/films/${id}`, options)
        .then(r => r.json())
        .then(data => {
            const { film } = data
            tr.querySelectorAll('td')[1].textContent = film.rating
        })
        .catch(console.warn)
}

function deleteFilm(id, li) {
    console.log('deleting', id);
    const options = {
        method: 'DELETE'
    };
    fetch(`http://localhost:3000/films/${id}`, options)
        .then(li.remove())
        .catch(console.warn)
}

// helper functions

function appendFilms(data) {
    data.films.forEach(appendFilm);
};

function appendFilm(filmData) {
    const newRow = document.createElement('tr');
    const filmListItem = formatFilmTableRow(filmData, newRow);
    filmsList.append(newRow);
};

function formatFilmTableRow(film, tr) {
    // name, genre, year, imdb rating
    const nameTd = document.createElement('td');
    const yearTd = document.createElement('td');
    const genreTd = document.createElement('td');
    const imdbTd = document.createElement('td');
    const delTd = document.createElement('td');
    const updTd = document.createElement('td');

    const delBtn = document.createElement('button');
    const updBtn = document.createElement('button');

    delBtn.setAttribute('class', 'delete');
    updBtn.setAttribute('class', 'update');

    delBtn.textContent = 'X';
    updBtn.textContent = '+';

    delBtn.onclick = () => deleteFilm(film.id, tr);
    updBtn.onclick = () => updateFilm(film.id. tr);

    delTd.append(delBtn);
    updTd.append(updBtn);

    nameTd.textContent = film.name;
    yearTd.textContent = film.year;
    genreTd.textContent = film.genre;
    imdbTd.textContent = film.rating;

    tr.append(nameTd);
    tr.append(yearTd);
    tr.append(genreTd);
    tr.append(imdbTd); 
    tr.append(updTd);
    tr.append(delTd);

    return tr;
}

// MESSAGE FLOW
function getMessage() {
    fetch('http://localhost:3000')
        .then(r => r.text())
        .then(renderMessage)
        .catch(console.warn)
};

function renderMessage() {
    document.querySelector('#msgBtn').textContent = "To be or not to be";
};