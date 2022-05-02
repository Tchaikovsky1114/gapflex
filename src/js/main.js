import 'regenerator-runtime/runtime'
import '../scss/main.scss'
import './navigate.js'

export const homeEl = document.querySelector('#app-contents');

// const searchIcon =  document.querySelector('#search-icon');
// const searchInput = document.querySelector('#search-input');
// const handleInput = () => {
//   searchInput.focus();
// };

// searchIcon.addEventListener('click', handleInput);

// const SHOWING = 'showing';
// const firstSilder = document.querySelector('.first-slide');
// const pauseButton = document.querySelector('.pause-button');
// const playButton = document.querySelector('.play-button');



// function onSlide() {
//   const autoplayBanner = setInterval(() => {
//     if (globalStore.flagger) {
//       return;
//     }
//     const currentSlide = document.querySelector(`.${SHOWING}`);
//     console.log('start!');
//     if (currentSlide) {
//       currentSlide.classList.remove(SHOWING);
//       const nextSlide = currentSlide.nextElementSibling;
//       if (nextSlide) {
//         nextSlide.classList.add(SHOWING);
//       }
//       if (!nextSlide) {
//         firstSilder.classList.add(SHOWING);
//       }
//     } else {
//       firstSilder.classList.add(SHOWING);
//       autoplayBanner();
//       clearInterval(autoplayBanner);
//     }
//   }, 5000);
// }
// pauseButton.addEventListener('click', () => {
//   console.log("pauseButton");
//   globalStore.flagger = true;
// });
// playButton.addEventListener('click', () => {
//   console.log("playButton");
//   globalStore.flagger = false;
// });

// onSlide();

// function initSlide(){
//   slideButton.addEventListener("click",onSlide);
//   firstSilder.classList.add(SHOWING);
// }
// initSlide()

// const movielist = document.querySelector('.movies--list');
// const API_KEY = 'apikey=7035c60c';


// const callMoreMovieButton = document.querySelector('.movies--button');





// async function getData(pageNumber, searchValue = 'bourne') {
//   const { Search: movies, totalResults } = await (
//     await fetch(`https://www.omdbapi.com?${API_KEY}&s=${searchValue}&page=${pageNumber}`)).json();
//   renderMovies(movies, totalResults, searchValue);
//   if(pageNumber * 10 < totalResults || totalResults < 10){
//   searchedResultCount(totalResults, searchValue);
// }else{
//   return;
// }
//   console.log(totalResults);

// }

// const renderMovies = (movies = 'bourne', totalResults, searchValue) => {

//   console.log(movies);
//   console.log(pageNumber);
//   [...movies].forEach((movie,i) => {

//     if(i < totalResults){
//     const movieEl = document.createElement('li');
//     const movieImg = document.createElement('img');
//     movieImg.setAttribute('src', `${movie.Poster}`);
//     movieImg.setAttribute('alt', `${movie.Title}`);
//     movieEl.innerHTML = `
//     <div class="movie--title"><p><span>${movie.Title}</span></p></div>
//     <div class=""movie--release--year> released in <span>${movie.Year}</span></div>
//     `;
//     movielist.append(movieEl);
//     movieEl.append(movieImg);

//   }
//   });
// };



// const moviesCount = document.querySelector('.movies--count');
// const resultCount = document.createElement('div');

// const searchedResultCount = (totalResults, searchValue) => {
//   resultCount.classList.add('movies--result')
//   if(moviesCount.hasChildNodes()){
//     resultCount.textContent = '';
//     resultCount.textContent = `There are "${totalResults}" total result for your "${searchValue.toUpperCase()}" search. `;
//   }
//     resultCount.textContent = '';
//     resultCount.textContent = `There are "${totalResults}" total result for your "${searchValue.toUpperCase()}" search. `;
//     moviesCount.append(resultCount);

// };

// let searchResult;
// let pageNumber = 1;
// const handleSearch =  (e) => {
//   pageNumber = 1;
//   searchResult = e.target.value;
//   while(movielist.hasChildNodes()){
//     movielist.removeChild(movielist.firstChild)
//   }
//   getData(1, searchResult);
//   console.log('excuted');
// };
// getData();

// searchInput.addEventListener('change', handleSearch);

// const showMoreSearchedMovieResult = (searchResult) => {  
//   pageNumber++;
//   getData(pageNumber,searchResult);

// }
// callMoreMovieButton.addEventListener('click', () => showMoreSearchedMovieResult(searchResult));