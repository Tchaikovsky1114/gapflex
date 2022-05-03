import {
    createElement,
    movielist
} from "./navigate";


export const globalStore = {
    flagger: false
}


const API_KEY = 'apikey=7035c60c';

export const Home = async() => {

    globalStore.flagger = false;

    setTimeout(() => {
        async function getData(pageNumber, searchValue = 'bourne') {
            const {
                Search: movies,
                totalResults
            } = await (await fetch(`https://www.omdbapi.com?${API_KEY}&s=${searchValue}&page=${pageNumber}`)).json();
            renderMovies(movies, totalResults);
            if (pageNumber * 10 < totalResults || totalResults < 10) {
                searchedResultCount(totalResults, searchValue);
            }
        }
        const callMoreMovieButton = document.querySelector('.movies--button');

        const movielist = document.querySelector('.movies--list')

        const renderMovies = (movies = 'bourne', totalResults) => {

            movies.map((movie, i) => {
                if (i < totalResults) {
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

        const SHOWING = 'showing';
        const firstSilder = document.querySelector('.slide:nth-child(1)');
        const pauseButton = document.querySelector('.pause-button');
        const playButton = document.querySelector('.play-button');


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
                        firstSilder.classList.add(SHOWING);
                    }
                } else {
                    console.log(firstSilder);
                    firstSilder.classList.add(SHOWING);
                    autoplayBanner();
                    clearInterval(autoplayBanner);
                }
            }, 5000);
        }
        pauseButton.addEventListener('click', () => {
            console.log("pauseButton");
            globalStore.flagger = true;
        });

        playButton.addEventListener('click', () => {
            console.log("playButton");
            globalStore.flagger = false;
        });
        onSlide()
    }, 500)
    return createElement(`<div class="slider">
<div class="slide showing">
  <h3>Monthly Recommend Movie Series<br/>:The Bourne Series</h3>
  
  <img class="silde--image" src="https://m.media-amazon.com/images/M/MV5BNGNiNmU2YTMtZmU4OS00MjM0LTlmYWUtMjVlYjAzYjE2N2RjXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg" alt="Bourne Series">
  <div class="button--group">
    <button>Preview</button>
    <button>Actors</button>
  </div>
</div>
<div class="slide">
  <h3>Monthly Recommend Movie Series<br/><span>:The Bourne Series</span></h3>
  
  <img class="silde--image" src="https://m.media-amazon.com/images/M/MV5BNGJlYjVkMjQtN2NlZC00NTJhLThmZjItMTRlZDczMmE3YmI3XkEyXkFqcGdeQXVyMzI0NDc4ODY@._V1_SX300.jpg" alt="Bourne Series">
  <div class="button--group">
    <button>Preview</button>
    <button>Actors</button>
  </div>
</div>
<div class="slide">
  <h3>Monthly Recommend Movie Series<br/><span>:The Bourne Series</span></h3>
  
  <img class="silde--image" src="https://m.media-amazon.com/images/M/MV5BYTIyMDFmMmItMWQzYy00MjBiLTg2M2UtM2JiNDRhOWE4NjBhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg" alt="Bourne Series">
  <div class="button--group">
    <button>Preview</button>
    <button>Actors</button>
  </div>
</div>
<div class="slide">
  <h3>Monthly Recommend Movie Series<br/><span>:The Bourne Series</span></h3>
  
  <img class="silde--image" src="https://m.media-amazon.com/images/M/MV5BY2NjMTg2YTctZjJlMy00MzA1LWE5NDAtMjhkZGU4ODhkYjFhXkEyXkFqcGdeQXVyNjg1ODU5MTU@._V1_SX300.jpg" alt="Bourne Series">
  <div class="button--group">
    <button>Preview</button>
    <button>Actors</button>
  </div>
</div>
<div class="slide">
  <h3>Monthly Recommend Movie Series<br/><span>:The Bourne Series</span></h3>
  
  <img class="silde--image" src="https://m.media-amazon.com/images/M/MV5BNGRlY2JmZWItZWFkMC00YTI3LWFhZTEtNjIwMTY3MzIzMDk5XkEyXkFqcGdeQXVyNTk5Nzg0MDE@._V1_SX300.jpg" alt="Bourne Series">
  <div class="button--group">
    <button>Preview</button>
    <button>Actors</button>
  </div>
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
};