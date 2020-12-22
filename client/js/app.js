// ********************************************
// SETUP
const btn = document.querySelector('#msgBtn');
const filmsList = document.querySelector('table');
// buttons and event listeners
btn.addEventListener('click', getMessage);
// fetch all films as soon as app is loaded
// showAllFilms();

// ********************************************

// FILMS FLOW

// index
// function showAllFilms() {
//     fetch('http://localhost:3000/films')
//         .then(r => r.json())
//         .then(appendFilms)
//         .catch(console.warn)
// };

// helper functions

// function appendFilms(data) {
//     data.films.forEach(appendFilm);
// };

// functin appendFilm(filmData) {
//     const newRow = document.createElement('tr');
//     const filmListItem = formatFilmTableRow(filmData, newRow);
//     filmsList.append(newRow);
// };

// function formatFilmTableRow(film, tr) {
//     // name, genre, year, imdb rating
//     const nameTd = document.createElement('td');
//     const yearTd = document.createElement('td');
//     const genreTd = document.createElement('td');
//     const imdbTd = document.createElement('td');

//     tr.append(nameTd);
//     tr.append(yearTd);
//     tr.append(genreTd);
//     tr.append(imdbTd);

//     return tr;
// }

// MESSAGE FLOW
function getMessage() {
    fetch('http://localhost:3000')
        .then(r => r.text())
        .then(renderMessage)
        .catch(console.warn)
};

function renderMessage() {
    document.querySelector('#msgBtn').textContent = "To be or not to be";
}