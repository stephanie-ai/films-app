// ********************************************
// SETUP
const btn = document.querySelector('#msgBtn');
const form = document.querySelector('#add-film-form');
const filmsList = document.querySelector('table');

// buttons and event listeners
btn.addEventListener('click', getQuote);
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
        method: 'PATCH',
    };
    fetch(`http://localhost:3000/films/${id}`, options)
        .then(r => r.json())
        .then(data => {
            const { film } = data
            console.log(film);
            tr.querySelectorAll('td')[3].textContent = film.rating
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

    // genreTd.setAttribute('class', 'genre');

    delBtn.onclick = () => deleteFilm(film.id, tr);
    updBtn.onclick = () => updateFilm(film.id, tr);

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
    tr.append(delTd);
    tr.append(updTd);

    return tr;
}

// MESSAGE FLOW
function getQuote() {
    fetch('http://localhost:3000')
        .then(r => r.text())
        .then(renderQuote)
        .catch(console.warn)
};

const shuffleQuotes = () => {
    const quotes = ['"Just keep swimming"', '"Here\'s looking at you, kid"', '"Bond. James Bond"', '"There\'s no place like home"', '"Show me the money!"', '"You can\'t handle the truth"', '"You\'re gonna need a bigger boat"', '"Hasta la vista, baby"', '"Carpe diem. Seize the day, boys. Make your lives extraordinary"', '"Nobody puts Baby in a corner"', '"I\'m king of the world"'];
    for (let i = quotes.length-1; i > 0; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = quotes[i];
        quotes[i] = quotes[j];
        quotes[j] = temp;
        return quotes[i];
    }
}

function renderQuote() {
    document.querySelector('#msgBtn').textContent = shuffleQuotes();
};

// filter by genre

function genreFilter() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

function filterSelection() {
    console.log('the action button has been clicked');
}