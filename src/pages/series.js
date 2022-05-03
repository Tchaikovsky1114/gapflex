import { globalStore } from './home';
import { createElement } from './navigate';


export const series = async() => {
    globalStore.flagger = true;
    setTimeout(() => {
        const API_KEY = 'apikey=7035c60c';

        async function getSeriesData(pageNumber, searchValue = '') {
            const { Search: movies, totalResults } = await (await fetch(`https://www.omdbapi.com/?apikey=7035c60c&type=series&plot=full&s=${searchValue}&page=${pageNumber}`)).json();

            if (pageNumber * 10 < totalResults || totalResults < 10) {
                searchedResultCount(totalResults, searchValue);
            }
            renderSeries(movies, totalResults);
        }



        function renderSeries(movies, totalResults) {

        }
        const seriesBannerWrapper = document.querySelector('.series--image--wrapper');

        const seriesFirstTitle = seriesBannerWrapper.querySelector('.series--image--box:first-of-type > div > h1');
        const seriesFirstImg = seriesBannerWrapper.querySelector('.series--image--box:first-of-type >  img');
        const seriesFirstRelease = seriesBannerWrapper.querySelector('.series--image--box:first-of-type > div > p');

        const seriesSecondTitle = seriesBannerWrapper.querySelector('.series--image--box:nth-of-type(2) > div > h1')
        const seriesSecondImg = seriesBannerWrapper.querySelector('.series--image--box:nth-of-type(2) > img')
        const seriesSecondRelease = seriesBannerWrapper.querySelector('.series--image--box:nth-of-type(2) >div > p')

        async function getFirstBanner() {
            const { Search: series } = await (await fetch(`https://omdbapi.com/?apikey=7035c60c&type=movie&plot=full&s=barbershop&page=1`)).json();
            seriesFirstTitle.innerHTML = `${series[1].Title}`;
            seriesFirstImg.setAttribute('src', `${series[1].Poster}`)
            seriesFirstRelease.innerHTML = `${series[1].Year}`
        }
        getFirstBanner();


        async function getSecondBanner() {
            const { Search: series } = await (await fetch(`https://omdbapi.com/?apikey=7035c60c&type=series&plot=full&s=brooklyn&page=1`)).json();
            seriesSecondTitle.innerHTML = `${series[0].Title}`;
            seriesSecondImg.setAttribute('src', `${series[0].Poster}`)
            seriesSecondRelease.innerHTML = `${series[0].Year}`
        }
        getSecondBanner();

    })

    return createElement(`
    <div class="subpage--wrapper">
        <h1 class="subpage--greeting">
        GAPFLEX PURSUES <br/>ONLY THE BEST SERIES</h1>
        <section class="series--banner--wrapper">
            <div class="series--image--wrapper">
                <div class="series--image--box">
                <div class="series--banner--description">
                    <h1></h1>
                    <p></p>
                    </div>
                    <img class="series--image" src="" alt="2">
                </div>
                <div class="series--image--box">
                <div class="series--banner--description">
                    <h1></h1>
                    <p></p>
                    </div>
                    <img class="series--image" src="" alt="3">
                </div>
            </div>
        </section>
    </div>
    `)
};