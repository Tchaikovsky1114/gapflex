import 'regenerator-runtime/runtime'
import '../scss/main.scss'
import './navigate.js'
import dotenv from 'dotenv'

dotenv.config()

console.log(process.env.API_KEY);
export const homeEl = document.querySelector('#app-contents');

