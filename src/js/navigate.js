import { globalStore } from "./main";

const contentsEl = document.querySelector('#app-contents');

window.onload = () => {
  const navigation = document.querySelector('.top-navigation');
  navigation.addEventListener('click',(e)=>{
    if(!e.target.matches('.history')){
      return;
    }
    const pathName = e.target.getAttribute('route')
      historyRouterPush(pathName,contentsEl)
      
  })
  
}

const historyRouterPush = (pathName,element) => {
  window.history.pushState({},pathName,window.location.origin + pathName);
  renderHtml(element,pathName)
  console.log('route[pathname]');
}

const renderHtml = (element,pathName) => {
  globalStore.flagger = true;
  element.innerHTML = pathName;
}
window.onpopstate = () => renderHtml(element,routes[window.location.pathname]);
