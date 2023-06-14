import {getItem} from "@/storage";
// set base url
export const socketUrl = 'https://apdev.bitocredit.com/';
// get language website from localstorage
export const lang = getItem('lang') || 'fa'
