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
    // newRow.setAttribute('class', 'filterDiv');
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
    tr.append(updTd);
    tr.append(delTd);
    
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
      let dropdowns = document.getElementsByClassName("dropdown-content");
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

function filterSelection(g) {
    console.log('the action button has been clicked');
    if (g === 'action') {
        console.log('action button part 2');
    } else if (g === 'comedy') {
        console.log('comedy has been chosen');
    } else if (g === 'disney') {
        console.log('disney has been chosen');
    } else if (g === 'mystery') {
        console.log('its a mystery');
    } else if (g === 'romance') {
        console.log('how romantic');
    }
}



// function filterSelection(g) {
//     console.log('the action button has been clicked');
//     let x, i;
//     x = document.getElementsByClassName("filterDiv");
//     if (g === "action") g = "";
//     for (let i = 0; i < x.length; i++) {
//         removeClass(x[i], "show");
//         if (x[i].className.indexOf(g) > -1) addClass(x[i], "show");
//     }
// }

// show filtered elements
// function addClass(element, name) {
//     let arr1, arr2;
//     arr1 = element.className.split(" ");
//     arr2 = name.split(" ");
//     for (let i = 0; i < arr2.length; i++) {
//       if (arr1.indexOf(arr2[i]) == -1) {
//         element.className += " " + arr2[i];
//       }
//     }
//   }
  
//   // Hide elements that are not selected
//   function removeClass(element, name) {
//     let arr1, arr2;
//     arr1 = element.className.split(" ");
//     arr2 = name.split(" ");
//     for (let i = 0; i < arr2.length; i++) {
//       while (arr1.indexOf(arr2[i]) > -1) {
//         arr1.splice(arr1.indexOf(arr2[i]), 1); 
//       }
//     }
//     element.className = arr1.join(" ");
//   }

// const genreAction = document.getElementById('genreAction');
//     genreAction.addEventListener('click', filterForAction);