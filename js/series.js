import './runtime'
require('../scss/main.scss');
require('../scss/series.scss');

const searchIcon = document.querySelector('#search-icon');
const searchInput = document.querySelector('#search-input');
const searchInputValue = document.querySelector('#search-input').value;
const handleInput = () => {
  searchInput.focus();
};


searchIcon.addEventListener('click', handleInput);





//https://www.omdbapi.com/?apikey=7035c60c&t=frozen&type=series

const movielist = document.querySelector('.movies--list');
const API_KEY = 'apikey=7035c60c';


const callMoreMovieButton = document.querySelector('.movies--button');

async function getData(pageNumber, searchValue = 'bourne') {
  const { Search: movies, totalResults } = await (
    await fetch(`https://www.omdbapi.com?${API_KEY}&s=${searchValue}&page=${pageNumber}`)).json();
  renderMovies(movies, totalResults, searchValue);
  searchedResultCount(totalResults, searchValue);
  console.log(totalResults);
}

const renderMovies = (movies = 'bourne', totalResults, searchValue) => {
  
  console.log(movies);
  
  [...movies].forEach((movie,i) => {
    if(i < totalResults){
    const movieEl = document.createElement('li');
    const movieImg = document.createElement('img');
    movieImg.setAttribute('src', `${movie.Poster}`);
    movieImg.setAttribute('alt', `${movie.Title}`);
    movieEl.innerHTML = `
    <div class="movie--title"><p><span>${movie.Title}</span></p></div>
    <div class=""movie--release--year> released in <span>${movie.Year}</span></div>
    `;
    movielist.append(movieEl);
    movieEl.append(movieImg);
  }
  });
};



const moviesCount = document.querySelector('.movies--count');
const resultCount = document.createElement('div');

const searchedResultCount = (totalResults, searchValue) => {
  if(moviesCount.hasChildNodes()){
    console.log('by returned');
    return;
  }
  resultCount.classList.add('movies--result')
    resultCount.textContent = '';
    resultCount.textContent = `There are "${totalResults}" total result for your "${searchValue.toUpperCase()}" search. `;
    moviesCount.append(resultCount);

};
// 초기 제이슨 본 밀고 검색결과부터 보이게 하면 된다 미래의 나야
const handleSearch = (e) => {
  const searchResult = e.target.value;
  getData(1, searchResult);
  console.log('excuted');
};
getData();

searchInput.addEventListener('change', handleSearch);


let pageNumber = 1;

callMoreMovieButton.addEventListener('click', () => {
  pageNumber++;
  getData(pageNumber);
});