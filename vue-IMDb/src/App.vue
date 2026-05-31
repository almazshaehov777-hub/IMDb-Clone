<script setup>
import { ref, onMounted, computed } from 'vue';

const API_KEY = 'ffeabaa1-6134-495b-832b-d4b92153805a';
let data = '';
let response = '';
const films = ref([]);
const search = ref('');

function goToMovie(movieId){
  window.location.href = `/movie.html?id=${movieId}`;
}

const filteredFilm = computed(() => {
  if(!search.value){
    return films.value;
  }
  return films.value.filter(movie => 
    movie.nameRu.toLowerCase().includes(search.value.toLowerCase())
  );
});

  async function f(){
    response = await fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1', {
      headers: {
        'X-API-KEY': API_KEY,
        'content-type': 'application/json'
      }
    });
    data = await response.json();
    films.value = data.films;
  }

  onMounted(() => {
    f();
  });
</script>

<template>
  <header>
    <div class="bg">
      <h2 class="logo">IMDb</h2>
      <input type="text" class="input" placeholder="...search" v-model="search">
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="hero-glow"></div>
      <div class="hero-glow-2"></div>
      <div class="hero-content">
        <h1 class="text">Сотни фильмов <span class="hero-text-1">в одном месте</span></h1>
        <p class="dest">Выбирите подходящий фильм себе на вечер</p>
      <div class="achivments">
        <div>
          <h2>250+</h2>
          <p>Фильмов</p>
        </div>
        <div>
          <h2>Кинопоиск</h2>
          <p>Рейтинг</p>
        </div>
      </div>
      </div>
    </section>

    <div class="films">
      <div class="card" :data-id="movie.filmId" v-for="movie in filteredFilm" :key="movie.filmId" @click="goToMovie(movie.filmId)">
      <div class="poster">
        <p class="ratingImage">{{ movie.rating }}</p>
        <img :src="movie.posterUrlPreview" class="imageFilm" width="300">
      </div>

      <div class="information">
        <p class="name">{{ movie.nameRu }}</p>
        <p class="year">{{ movie.year }} ● {{ movie.genres?.[0]?.genre }}</p>
      </div>
      </div>
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
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    padding: 5px;
    border-radius: 7px;
    margin-left: 20px;
    background: -webkit-linear-gradient(left, yellow, rgb(255, 174, 0));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
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
  }
  .dest{
    font-size: 18px;
    font-family: Freemono,monospace;
    color: lightgray;
    opacity: 0.85;
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
  .hero-text-1{
    background: -webkit-linear-gradient(10deg, #f5b042, #ff6b6b);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .achivments{
    display: flex;
    gap: 80px;
    justify-content: center;
    text-align: center;
  }
  .achivments>div>h2{
    background: -webkit-linear-gradient(bottom, rgb(255, 139, 30), rgb(255, 186, 58));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: Freemono, monospace;
  }
  .achivments>div>p{
    font-size: 18px;
    opacity: 0.6;
    font-family: Freemono, monospace;
  }
</style>