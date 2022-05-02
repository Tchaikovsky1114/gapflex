import { globalStore } from "./Home";

export const Profile = async() => {
    globalStore.flagger = true;
    return "MyPage"
        // const { title, content } = await fetchData('/data/about.json');
        // return createElement(`<h1>${title}</h1><p>${content}</p>`);
};