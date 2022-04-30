import 'regenerator-runtime/runtime'
require('../scss/main.scss');


const searchIcon = document.querySelector('#search-icon');
const searchInput = document.querySelector('#search-input');
const searchInputValue = document.querySelector('#search-input').value;
const handleInput = () =>{
  searchInput.focus();
}

searchIcon.addEventListener('click',handleInput);


























const SHOWING = 'showing';
const firstSilder = document.querySelector(".slide:first-child");
const pauseButton = document.querySelector('.pause-button');
const playButton = document.querySelector('.play-button');
let flagger = false;
function onSlide(){

  const autoplayBanner = setInterval(() => {
    if(flagger){
      return;
    }
  const currentSlide = document.querySelector(`.${SHOWING}`);
  console.log('start!')
  if(currentSlide){
    currentSlide.classList.remove(SHOWING);
    const nextSlide = currentSlide.nextElementSibling;
    if(nextSlide){
      nextSlide.classList.add(SHOWING);
   }
   if(!nextSlide){
     firstSilder.classList.add(SHOWING);
     
   }
  }else{
    firstSilder.classList.add(SHOWING);
    autoplayBanner();
    clearInterval(autoplayBanner) 
  }
},5000)

}
pauseButton.addEventListener('click',()=>{
  flagger = true;
})
playButton.addEventListener('click',()=>{
  flagger = false;
})

onSlide();





// function initSlide(){
//   slideButton.addEventListener("click",onSlide);
//   firstSilder.classList.add(SHOWING);
// }
// initSlide()





const movielist = document.querySelector('.movies--list')
const API_KEY = 'apikey=7035c60c'
let pageNumber = 1;

//Search{
//Title Year imdbID Type Poster
//}


// 버튼클릭




const handleSearch = (e) =>{
  async function getData() {
    const {Search:movies,totalResults} = await (await fetch(`https://www.omdbapi.com?${API_KEY}&s=${e.target.value}&page=${pageNumber}`)).json();
      pageNumber++;  
      console.log(movies);
    }
    getData()
}

searchInput.addEventListener('change',handleSearch)







const moviesList = document.querySelector('.movies');
const moviescount = document.querySelector('.movies--count');



const callMoreMovieButton = document.querySelector('.movies--button')

callMoreMovieButton.addEventListener('click', () => {
  pageNumber++;
  getData(pageNumber, moviesList);
})

async function getData(pageNumber,containerEl,searchValue="busters") {
  const {Search:movies,totalResults} = await (await fetch(`https://www.omdbapi.com?${API_KEY}&s=${searchValue}&page=${pageNumber}`)).json();
    renderMovies(movies,totalResults)
  }
  
  function renderMovies(movies,totalResults){
  movies.forEach(movie =>{
    const movieEl = document.createElement('li');
    movieEl.textContent = movie.Title;
    movielist.append(movieEl);
    })
    
  }
  getData(pageNumber, moviesList)  


  // const searchResult = document.createElemt('li');
  //   searchResult.textContent = `검색결과 총 ${totalResults}건이 있습니다.`
  //   moviescount.append(searchResult);








