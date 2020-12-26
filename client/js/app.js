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

function renderMessage() {
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

// function genreFilter() {
//     let input, filter, table, tr, td, i, textValue;
//     input = document.getElementById("genreFilter");
//     filter = input.value.toUpperCase();
//     table = document.getElementById("filmsTable");
//     tr = table.getElementsByTagName("tr");

//     // loop through the table rows and hide the ones that don't match the genre selected
//     for (i = 0; i < tr.length; i++) {
//         td = tr[i].getElementsByTagName("td")[0];
//         if (td) {
//             textValue = td.textContent || td.innerText;
//             if (textValue.toUpperCase().indexOf(filter) > -1) {
//                 tr[i].style.display = "";
//             } else {
//                 tr[i].style.display = "none";
//             }
//         }
//     }
// }