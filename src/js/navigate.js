import Home from "./Home.js";
import { signup } from "./signup.js";
import { profile } from "./profile.js";
import { login } from "./login.js";
import Series from "./Series.js";
import { homeEl } from "./index.js";




// window가 랜더링될때 해당 작업이 시작된다
window.onload = () => {

    // routes 설정. path와 component로 나누어져 있다.
    const routes = [{
        // path는 a tag의 href attribute value와 값이 같아야 한다.
        // component는 해당 경로가 같을 때, 즉 해당 주소로 이동될 때 불러올 컴포넌트를 의미한다.
            path: '/',
            component: Home
        },
        {
            path: '/series',
            component: Series
        },
        {
            path: '/signup',
            component: signup
        },
        {
            path: '/login',
            component: login
        },
        {
            path: '/profile',
            component: profile
        }
    ]
    // 전체 페이지에서 보일 네비게이션.
    const navigation = document.querySelector('.top-navigation');


    // 랜더링하는 함수. pathName을 매개변수로 받는다.
    // async await을 사용하는 이유는, component에 비동기함수가 포함되어 있기 때문이다.
    const renderHtml = async pathName => {
        try {
            // 먼저 route.path의 값과 pathName의 값이 같은 것을 찾고
            // 찾은 객체의 component 프로퍼티 벨류로 설정한다. 만약 없다면 Home으로 init한다.
            const component = routes.find(route => route.path === pathName)?.component || Home;
            // component에 랜더링의 root이 되는 element를 인자로 각 컴포넌트에게 넘겨준다.
            await component(homeEl);
            
        } catch (err) {
            console.error(err);
        }
    }
    // event delagation. 
    navigation.addEventListener('click', (e) => {
        // 각 라우트에는 동일한 클래스가 들어간다. 만약 click한 요소에 찾는 클래스값이 없다면 리턴한다.
        if (!e.target.matches('.history')) {
            return;
        }
        // 있다면 a링크의 기본기능을 방지시키고
        e.preventDefault();
        // href 어트리뷰트의 값만 pathName으로 할당한다.
        const pathName = e.target.getAttribute('href')
        // pushState할당된 pathName 변수로 새로운 라우트를 생성한다.
        window.history.pushState({
            pathName
        }, null, location.origin + pathName);
        //그리고 pathName을 넣어 renderHTML 실행.
        renderHtml(pathName)

    })

    //첫 화면에 보여 줄 path
    renderHtml('/');
}

//popstate는 pushState로 주소를 바꾼 뒤에 뒤로가기,앞으로가기를 했을 때 발생하는 이밴트다.
//pushState를 할 때 이벤트가 발생하는 것이 아니다.
window.addEventListener('popstate', () => {
    renderHtml(window.location.pathname);
})


// template. homeEl에 들어갈 HTML 요소를 string 형태로 받아 화면에 뿌린다.
export const createElement = string => {
    const componentTemplate = document.createElement('template');
    componentTemplate.innerHTML = string;
    return componentTemplate.content;
};



export const NotFound = () => createElement('<h1>404 NotFound</p>');