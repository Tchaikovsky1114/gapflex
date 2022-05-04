import {
  createElement
} from "./navigate.js";





export const globalStore = {
  flagger: false
}

const fetchData = async (pageNumber = 1, searchValue = 'bourne') => {
  const res = await fetch(`https://www.omdbapi.com?apikey=${process.env.API_KEY}&s=${searchValue}&page=${pageNumber}`);
  const json = await res.json();
  console.log('fetchmovie')
  return json;
}


// //상태 : 데이터 (값,명사)
// const state = {
//   a: 1
// }
// //액션 : 데이터를 조정하는 동작(동사)
// const actions = {
//   getData() {
//     state.a = 2
//   }
// }
// function getData() {
//   // state.a
// }

export default async (homeEl) => {
  globalStore.flagger = false;

  const {
    Search: movies,
    totalResults
  } = await fetchData()

  console.log(movies, totalResults);

  // comment tagged 사용
  const component = createElement( /* html */ `
  <div class="synopsis--wrapper hide">
  <div class="synopsis bg"><p>Bourne:Synopsis</p>In Jason Bourne, Bourne remains on the run from CIA hit squads as he tries to uncover hidden truths about his father, while CIA director Robert Dewey orders the head of cyber-security Heather Lee to hunt him down. </div>
  <div class="synopsis fg"><p>Bourne:Synopsis</p>In Jason Bourne, Bourne remains on the run from CIA hit squads as he tries to uncover hidden truths about his father, while CIA director Robert Dewey orders the head of cyber-security Heather Lee to hunt him down. </div>
  </div>
  
<div class="button--group">
  <button class="synopsis--button">Synopsis</button>
  <button class="actors--button">Actors</button>
</div>
  <div class="slider">

<div class="slide first--slide showing">
<h3>Monthly Recommend Movie Series<br/>:The Bourne Series</h3>
<img class="silde--image" src=${movies[0].Poster} alt="Bourne Series">
</div>

<div class="slide">
<h3>Monthly Recommend Movie Series<br/><span>:The Bourne Series</span></h3>
<img class="silde--image" src=${movies[2].Poster} alt="Bourne Series">
</div>

<div class="slide">
<h3>Monthly Recommend Movie Series<br/><span>:The Bourne Series</span></h3>
<img class="silde--image" src=${movies[3].Poster} alt="Bourne Series">
</div>

<div class="slide">
<h3>Monthly Recommend Movie Series<br/><span>:The Bourne Series</span></h3>
<img class="silde--image" src=${movies[4].Poster} alt="Bourne Series">
</div>

<div class="slide">
<h3>Monthly Recommend Movie Series<br/><span>:The Bourne Series</span></h3>
<img class="silde--image" src=${movies[6].Poster} alt="Bourne Series">
</div>

</div>
<div class="button--wrapper">
<button class="pause-button">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
<path
  d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z"
/>
</svg>
</button>
<button class="play-button">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
<path
  d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z"
/>
</svg>
</button>
</div>
<section class="section banner">
<div class="inner">
<div class="movies--count"></div>
<ul class="movies--list"></ul>

<button class="movies--button">Show More Movies</button>
</div>
</section>
</div>
`);






  const SHOWING = 'showing';


  function onSlide() {
    const autoplayBanner = setInterval(() => {
      if (globalStore.flagger) {
        return;
      }
      const currentSlide = document.querySelector(`.${SHOWING}`);
      console.log('start!');
      if (currentSlide) {
        const nextSlide = currentSlide.nextElementSibling;
        currentSlide.classList.remove(SHOWING);
        if (nextSlide) {
          nextSlide.classList.add(SHOWING);
        }
        if (!nextSlide) {
          const firstSilder = document.querySelector('.first--slide');
          firstSilder.classList.toggle(SHOWING);
        }
      } else {

        firstSilder.classList.add(SHOWING);
        autoplayBanner();
        clearInterval(autoplayBanner);
      }
    }, 10000);
  }
  onSlide();

  homeEl.innerHTML = ''
  homeEl.append(component)
  afterRender()
};




async function getData(pageNumber, searchValue = 'bourne') {
  const {
    Search: movies,
    totalResults
  } = await (await fetch(`https://www.omdbapi.com?apikey=${process.env.API_KEY}&s=${searchValue}&page=${pageNumber}`)).json();
  renderMovies(movies, totalResults);
  if (pageNumber * 10 < totalResults || totalResults < 10) {
    searchedResultCount(totalResults, searchValue);
  }
}

function renderMovies(movies = 'bourne', totalResults){
  const movielist = document.querySelector('.movies--list')
  movies.map((movie, i) => {
    if (i < totalResults) {
      const movieEl = document.createElement('li');
      const movieImg = document.createElement('img');
      movieImg.setAttribute('src', `${movie.Poster}`);
      movieImg.setAttribute('alt', `${movie.Title}`);
      movieEl.classList.add('movie--card');

      movieEl.innerHTML = `
                <div class="movie--title"><p><span>${movie.Title}</span></p></div>
                <div class="movie--release--year"> released in <span>${movie.Year}</span></div>
                `;
      movielist.append(movieEl);
      movieEl.append(movieImg);

    }
  });
};
function searchedResultCount(totalResults, searchValue){
  const moviesCount = document.querySelector('.movies--count');
  const resultCount = document.createElement('div');

  resultCount.classList.add('movies--result')
  if (moviesCount.hasChildNodes()) {
    resultCount.textContent = '';
    resultCount.textContent = `There are "${totalResults}" total result for your "${searchValue.toUpperCase()}" search. `;
  } else {
    resultCount.textContent = '';
    resultCount.textContent = `There are "${totalResults}" total result for your "${searchValue.toUpperCase()}" search. `;
    moviesCount.append(resultCount);
  }
};

function afterRender() {
  const movielist = document.querySelector('.movies--list')
  const callMoreMovieButton = document.querySelector('.movies--button');
  let searchResult;
  let pageNumber = 1;
  const handleSearch = (e) => {
    pageNumber = 1;
    searchResult = e.target.value;
    while (movielist.hasChildNodes()) {
      movielist.removeChild(movielist.firstChild)
    }
    getData(pageNumber, searchResult);
    console.log('excuted');
  };
  getData();

  const searchIcon = document.querySelector('#search-icon');
  const searchInput = document.querySelector('#search-input');
  searchInput.addEventListener('change', handleSearch);

  const showMoreSearchedMovieResult = (searchResult) => {
    pageNumber++;
    getData(pageNumber, searchResult);

  }
  callMoreMovieButton.addEventListener('click', () => showMoreSearchedMovieResult(searchResult));

  const handleInput = () => {
    searchInput.focus();
  };

  searchIcon.addEventListener('click', handleInput);


  const pauseButton = document.querySelector('.pause-button');
  const playButton = document.querySelector('.play-button');


  pauseButton.addEventListener('click', () => {
    console.log("pauseButton");
    globalStore.flagger = true;
  });

  playButton.addEventListener('click', () => {
    console.log("playButton");
    globalStore.flagger = false;
  });

  const synopsisToggleEl = document.querySelector('.synopsis--button')
  const synopsisEl = document.querySelector('.synopsis--wrapper');
  const actorsToggle = document.querySelector('.actors--button');
  function handleSynopsis() {
    synopsisEl.classList.remove('hide')
    synopsisEl.innerHTML = /* html */`
    <div class="synopsis bg"><p>Bourne:Synopsis</p>In Jason Bourne, Bourne remains on the run from CIA hit squads as he tries to uncover hidden truths about his father, while CIA director Robert Dewey orders the head of cyber-security Heather Lee to hunt him down. </div>
  <div class="synopsis fg"><p>Bourne:Synopsis</p>In Jason Bourne, Bourne remains on the run from CIA hit squads as he tries to uncover hidden truths about his father, while CIA director Robert Dewey orders the head of cyber-security Heather Lee to hunt him down. </div>
    `
  }
  
  synopsisToggleEl.addEventListener('click', handleSynopsis)
    
  
  
  function handleActors(){
    synopsisEl.classList.remove('hide')
    synopsisEl.innerHTML = /* html */`
    <div class="synopsis bg"><p>Bourne:Actors</p>
  <p>Jason Bourne - Matt Damon</p>
  <p>Rachel Weisz - Mata Sierring</p>
  <p>Marie Helena Kreuts -Franka Potente </p>
  <p>Nicky Parsons - Julia Stiles</p>
  <p>Ward Abbott - Brian Cox </p>
</div>
<div class="synopsis fg"><p>Bourne Series:Actors</p>
  <p>Jason Bourne - Matt Damon</p>
  <p>Rachel Weisz - Mata Sierring</p>
  <p>Marie Helena Kreuts -Franka Potente </p>
  <p>Nicky Parsons - Julia Stiles</p>
  <p>Ward Abbott - Brian Cox </p>
</div>
    `
  }

  actorsToggle.addEventListener('click',handleActors);
  
}