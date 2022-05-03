import {
    globalStore,
    Home
} from "./Home.js";
import {
    Signup
} from "./Signup.js";
import {
    Profile
} from "./Profile.js";
import {
    Login
} from "./Login.js";
import {
    Series
} from "./Series.js";
import { homeEl } from "./main.js";



const signupEl = document.querySelector('#app-contents');
const profileEl = document.querySelector('#app-contents');
const loginEl = document.querySelector('#app-contents');
const seriesEl = document.querySelector('#app-contents');


const routes = [{
        path: '/',
        components: Home
    },
    {
        path: '/series',
        components: Series
    },
    {
        path: '/signup',
        components: Signup
    },
    {
        path: '/login',
        components: Login
    },
    {
        path: '/profile',
        components: Profile
    }
]

window.onload = () => {
    const navigation = document.querySelector('.top-navigation');
    navigation.addEventListener('click', (e) => {
        if (!e.target.matches('.history')) {
            return;
        }
        e.preventDefault();
        const pathName = e.target.getAttribute('href')
        window.history.pushState({
            pathName
        }, null, location.origin + pathName);
        renderHtml(pathName)
    })
}


const renderHtml = async(pathName) => {

    const component = routes.find(route => route.path === pathName).components;
    console.log(await component());
    homeEl.replaceChildren(await component());

}


//popstate는 pushState로 주소를 바꾼 뒤에 뒤로가기,앞으로가기를 했을 때 발생하는 이밴트다.
//pushState를 할 때 이벤트가 발생하는 것이 아니다.
window.addEventListener('popstate', () => {
    renderHtml(window.location.pathname);
})

export const createElement = string => {
    const componentTemplate = document.createElement('template');
    componentTemplate.innerHTML = string;
    return componentTemplate.content;
};

renderHtml(window.location.pathname);




export const NotFound = () => createElement('<h1>404 NotFound</p>');

// const fetchData = async url => {
//   const res = await fetch(url);
//   const json = await res.json();
//   return json;
// };






//