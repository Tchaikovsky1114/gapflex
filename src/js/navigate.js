import { Home } from "./Home";
import { Signup } from "./Signup.js";
import { Profile } from "./Profile.js";
import { Login } from "./Login.js";
import { Series } from "./Series.js";
import { homeEl } from "./index.js";


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






    const renderHtml = async pathName => {
        try {
            const component = routes.find(route => route.path === pathName).components || Home;
            homeEl.replaceChildren(await component());
        } catch (err) {
            console.error(err);
        }
    }

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


    renderHtml('/');
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



export const NotFound = () => createElement('<h1>404 NotFound</p>');