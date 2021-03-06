import {
    globalStore
} from './Home.js';
import {
    createElement
} from './navigate.js';

const API_KEY = "7035c60c";
export default async (homeEl) => {

    const component = createElement( /*html*/ `
    <div class="subpage--wrapper">
        <h1 class="subpage--greeting">
        GAPFLEX <br/> The Best Series</h1>
        <section class="series--banner--wrapper">
            <div class="series--image--wrapper">
                <div class="series--poster--box">
                <div class="series--banner--description">
                    <h1></h1>
                    <p></p>
                    </div>
                    <img class="series--image" src="" alt="2">
                </div>
                <div class="series--poster--box">
                <div class="series--banner--description">
                    <h1></h1>
                    <p></p>
                    </div>
                    <img class="series--image" src="" alt="3">
                </div>
            </div>
        </section>
        <section>
            <h3 class="series--search--result"></h3>
        <ul class="series--list">
        <div class="series--slide--wrapper">

        </div>
        </ul>
        <div class="series--slide--button hide">
            <div class="slide--prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM310.6 345.4c12.5 12.5 12.5 32.75 0 45.25s-32.75 12.5-45.25 0l-112-112C147.1 272.4 144 264.2 144 256s3.125-16.38 9.375-22.62l112-112c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L221.3 256L310.6 345.4z"/></svg></div>
            <div class="slide--next"><svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 512 512"><path d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM358.6 278.6l-112 112c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25L290.8 256L201.4 166.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l112 112C364.9 239.6 368 247.8 368 256S364.9 272.4 358.6 278.6z"/></svg></div>
        </div>
        
        
        </section>
    </div>
    `)
    homeEl.innerHTML = '';
    homeEl.append(component);
    afterRendering()
};


async function getFirstBanner() {
    const seriesBannerWrapper = document.querySelector('.series--image--wrapper');
    const seriesFirstTitle = seriesBannerWrapper.querySelector('.series--poster--box:first-of-type > div > h1');
    const seriesFirstImg = seriesBannerWrapper.querySelector('.series--poster--box:first-of-type >  img');
    const seriesFirstRelease = seriesBannerWrapper.querySelector('.series--poster--box:first-of-type > div > p');

    const {
        Search: series
    } = await (await fetch(`https://omdbapi.com/?apikey=${API_KEY}&type=movie&plot=full&s=barbershop&page=1`)).json();

    seriesFirstTitle.innerHTML = `${series[1].Title}`;
    seriesFirstImg.setAttribute('src', `${series[1].Poster}`)
    seriesFirstRelease.innerHTML = `${series[1].Year}`

}
async function getSecondBanner() {
    const seriesBannerWrapper = document.querySelector('.series--image--wrapper');
    const seriesSecondTitle = seriesBannerWrapper.querySelector('.series--poster--box:nth-of-type(2) > div > h1')
    const seriesSecondImg = seriesBannerWrapper.querySelector('.series--poster--box:nth-of-type(2) > img')
    const seriesSecondRelease = seriesBannerWrapper.querySelector('.series--poster--box:nth-of-type(2) >div > p')

    const {Search: series} = await (await fetch(`https://omdbapi.com/?apikey=${API_KEY}&type=series&plot=full&s=brooklyn&page=1`)).json();

    seriesSecondTitle.innerHTML = `${series[0].Title}`;
    seriesSecondImg.setAttribute('src', `${series[0].Poster}`)
    seriesSecondRelease.innerHTML = `${series[0].Year}`
}

function afterRendering() {
    
    
    getFirstBanner();
    getSecondBanner();
    



    let searchValue;
    let pageNumber = 1;
    globalStore.flagger = true;
    let currentIndex = 1;
    let newPageNumber = 1;

    const searchInput = document.querySelector('#search-input');
    const seriesSlideWrapper = document.querySelector('.series--slide--wrapper');

    const searchSeries = async ({target} = searchValue,pageNumber) => {
        pageNumber = 1;
        newPageNumber = 1;
        currentIndex = 1;
        while(seriesSlideWrapper.firstChild){
            seriesSlideWrapper.removeChild(seriesSlideWrapper.firstChild)
        }
        if(!target){
            target = searchValue;
        }else{
        searchValue = target.value;
        }
        const {Search: series,totalResults} = await (
                await fetch(`https://omdbapi.com/?apikey=${API_KEY}&type=series&s=${searchValue}&plot=full&page=${pageNumber}`)).json();
        console.log(series);
        if(!totalResults || location.pathname !== "/series" || !series){
            console.log("???????????? ????????? ????????????.")
        }else{
            renderSeries(series, totalResults)
        }
    }

    

    
    
    const searchSeriesResult = document.querySelector('.series--search--result');
    
    const seriesSlideButtonBox = document.querySelector('.series--slide--button'); 
    function renderSeries(series, totalResults) {
        
        
        searchSeriesResult.innerHTML = "";
        searchSeriesResult.innerHTML = `There are "${totalResults}" total result for your "${searchValue.toUpperCase()}" search. `;
        seriesSlideButtonBox.classList.remove('hide');
        series.map((series) => {
            const seriesCard = document.createElement('li');
            seriesCard.classList.add('series--card');
            seriesCard.innerHTML = /* html */ `
            <div class="series--title"><span>${series.Title}</span></div>
            <div class="series--release--year"><p>${series.Year}</P></div>
            <div class="series--image--box"><img src=${series.Poster} alt=${series.Title} /></div>
            
            `;
            seriesSlideWrapper.append(seriesCard);
        })
    }
    

    const seriesSlidePrevButton = document.querySelector('.slide--prev');
    const seriesSlideNextButton = document.querySelector('.slide--next');
    
    
    function handleSlidePrev(){        
        currentIndex > 0 ? currentIndex-- : 1
        
        const slideCard = seriesSlideWrapper.getElementsByClassName('series--card');
        const size = slideCard[0].clientWidth * 4;
        seriesSlideWrapper.style.transition = `transform 0.4s ease-in-out`
        seriesSlideWrapper.style.transform = `translateX(${-size * currentIndex}px)`
    }
    function handleSlideNext(){
        currentIndex++;
        const slideCard = seriesSlideWrapper.getElementsByClassName('series--card');
        const size = slideCard[0].clientWidth * 4;
        seriesSlideWrapper.style.transition = `transform 0.4s ease-in-out`;
        seriesSlideWrapper.style.transform = `translateX(${-size * currentIndex}px)`;
        
        showMoreSearchedSeriesResult()
        
    }
    

    seriesSlidePrevButton.addEventListener('click',handleSlidePrev);
    seriesSlideNextButton.addEventListener('click',handleSlideNext);
    searchInput.addEventListener('change', searchSeries)
    
    const callMoreSearchSeries = async(searchValue,newPageNumber) => {
        console.log(newPageNumber);
        console.log(searchValue);

        const {Search: series,totalResults} = await (
                await fetch(`https://omdbapi.com/?apikey=${API_KEY}&type=series&s=${searchValue}&plot=full&page=${newPageNumber}`)).json();
        console.log(series);
        if(!totalResults || location.pathname !== "/series" || !series){
            console.log("??????????????? ????????????.")
        }else{
            renderSeries(series, totalResults)
        }
    }
    
    const showMoreSearchedSeriesResult = () => {
        newPageNumber++;
        callMoreSearchSeries(searchValue,newPageNumber);
    }

}
