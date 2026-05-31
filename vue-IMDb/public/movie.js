const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

const API_KEY = 'ffeabaa1-6134-495b-832b-d4b92153805a';
const btn = document.getElementById('back');

async function f(){
    const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${movieId}`, {
        headers: {
            'X-API-KEY': API_KEY,
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log(data);

    const image = document.getElementById('image');
    const name = document.getElementById('name');
    const rating = document.getElementById('rating');
    const year = document.getElementById('year');
    const description = document.getElementById('description');
    const genre = document.getElementById('genre');
    const country = document.getElementById('country');
    const ageRating = document.getElementById('ageRating');
    const length = document.getElementById('length');
    let hours = Math.floor(data.filmLength / 60);
    let minutes = data.filmLength % 60;
    image.src = data.posterUrlPreview;
    name.textContent += data.nameRu;
    rating.textContent += data.ratingKinopoisk + '⭐';
    year.textContent += data.year;
    description.textContent = data.description;
    genre.textContent += data.genres?.[0]?.genre;
    country.textContent += data.countries?.[0]?.country;
    ageRating.textContent += data.ratingAgeLimits.slice(3) + '+';
    length.textContent += `${hours}ч ${minutes}мин`
}
    btn.addEventListener('click', () => {
        history.back();
    });
f();