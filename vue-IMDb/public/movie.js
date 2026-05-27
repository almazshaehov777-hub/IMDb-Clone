const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

const API_KEY = 'ffeabaa1-6134-495b-832b-d4b92153805a';

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
    image.src = data.posterUrlPreview;
    name.textContent = data.nameRu;
    rating.textContent = data.ratingImdb + '⭐';
    year.textContent = data.year + ' ● ' + data.genres?.[0]?.genre;
}

f();