"use client"
import axios from 'axios'
export async function fetchAPIPage(page: number) {
    const bookPage = 24;
    const apiUrl = `${page}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json()
        return data;
    } catch (error) {
        console.log('fetching data', error);
        return null
        
    }
}
export async function fetchAPI(page : number) {
    const apiUrl = `https://bixso-book-mgmt-web.onrender.com/api/v1/books/?pagenum=${page}`;
    try {
        const response = await axios(apiUrl) ;
        return response.data?.data
    } catch (error) {
        console.log('fetching data', error);
        return null  
    }
}