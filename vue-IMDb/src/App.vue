<script setup>
import { ref, onMounted } from 'vue';

const API_KEY = 'ffeabaa1-6134-495b-832b-d4b92153805a';
let data = '';
let response = '';
const input = document.getElementById('inputSearch');

function goToMovie(movieId){
  window.location.href = `/movie.html?id=${movieId}`;
}

  async function f(){
    response = await fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1', {
      headers: {
        'X-API-KEY': API_KEY,
        'content-type': 'application/json'
      }
    });
    data = await response.json();
    createCard(data);
  }

  function createCard(data){
    for(let i = 0; i<data.films.length; ++i){
    let container = document.querySelector('.films');
    let movie = data.films[i];
    let html = '';

    html += `
    <div class="card" data-id="${movie.filmId}">
      <div class="poster">
        <p class="ratingImage">${movie.rating}</p>
        <img src="${movie.posterUrlPreview}" class="imageFilm" width="300">
      </div>

      <div class="information">
        <p class="name">${movie.nameRu}</p>
        <p class="rating">${movie.rating}⭐</p>
        <p class="year">${movie.year} ● ${movie.genres?.[0]?.genre}</p>
      </div>
  </div>
    `;
    container.innerHTML += html;
  }

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const movieId = card.dataset.id;
      if(movieId){
        goToMovie(movieId);
      }
    });
  });
  }

  onMounted(() => {
    f();
  });
</script>

<template>
  <header>
    <div class="bg">
      <h2 class="logo">IMDb</h2>
      <input type="text" class="input" placeholder="...search" id="inputSearch">
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="hero-glow"></div>
      <div class="hero-glow-2"></div>
      <div class="hero-content">
        <h1 class="text">Сотни фильмов в одном месте</h1>
        <p class="dest">Выбирите подходящий фильм себе на вечер</p>
      </div>
    </section>

    <div class="films">

    </div>
  </main>

  <footer>
    <div class="bgFooter">
      <p>© 2026 · Данные: Kinopoisk API Unofficial</p>
      <a href="https://github.com/almazshaehov777-hub/IMDb-Clone" target="_blank"><img src="./image/github (1).png" width="40" class="imageFooter"></a>
    </div>
  </footer>
</template>

<style scoped>
  .bg{
    display: flex;
    background: #101113;
    height: 60px;
    align-items: center;
    justify-content: space-between;
  }
  .logo{
    font-family: Freemono, monospace;
    background: rgb(224, 224, 0);
    padding: 5px;
    border-radius: 7px;
    margin-left: 20px;
  }
  .input{
    position: relative;
    left: -50%;
    transform: translateX(50%);
    width: 250px;
    height: 20px;
    border-radius: 10px;
    border: 0;
    font-size: 16px;
    font-family: Georgia, serif;
  }
  .input::placeholder{
    font-size: 16px;
  }
  .image{
    width: 100%;
    height: 100%;
  }
  .image-con{
    width: 100%;
    height: 400px;
    overflow: hidden;
  }
  .hero{
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px;
    position: relative;
    background: linear-gradient(125deg, #0a0a0f 0%, #1a1a2e 100%);
    border-radius: 20px;
    z-index: 0;
    margin-top: 30px;
  }
  .hero::before{
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 95% 10%, rgba(189, 63, 0, 0.3), rgba(255,85,0,0) 40%);
    z-index: 1;
    border-radius: 40px;
  }
  .hero-content{
    z-index: 2;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .hero-glow{
    z-index: 1;
    inset: 0;
    position: absolute;
    background: radial-gradient(circle at 10% 95%, rgba(0, 26, 172, 0.3), rgba(255,85,0,0) 35%);
    border-radius: 20px;
  }
  .hero-glow-2{
    z-index: 1;
    inset: 0;
    position: absolute;
    background: radial-gradient(circle at 40% 40%, rgba(0, 94, 138, 0.2), rgba(255,85,0,0) 40%);
  }
  .text{
    font-size: 35px;
    font-family: Freemono, monospace;
    background: -webkit-linear-gradient(left, white, rgba(189, 63, 0, 0.3));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .dest{
    font-size: 18px;
    font-family: Freemono,monospace;
    color: lightgray;
  }
  .films{
    display: grid;
    grid-template-columns: repeat(4, 300px);
    justify-content: center;
    margin-top: 30px;
    gap: 50px;
  }
  .bgFooter{
    background: #101113;
    display: flex;
    justify-content: space-between;
    color: rgba(255, 255, 255, 0.6);
    padding: 35px;
    margin-top: 70px;
  }
  .imageFooter{
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
</style>