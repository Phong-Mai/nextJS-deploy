'use client';
import { getLocalBook, setLocalBook } from '@/services/localstroge';
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

// export interface CounterState = {
//     value : number
// }

const initialState : any = {
    books : null || [],
    hasNextPage : true,
    search : null,
    sort : null,
    }


export const booksSlice: any = createSlice({
    name: "books",
    initialState,
    reducers :{
       searchBook : (state, action) => {
        const result = state.books.filter((rs) => rs.title.toUpperCase().includes(action.payload.toUpperCase()) || rs.author.toUpperCase().includes(action.payload.toUpperCase()))
       localStorage.setItem("searchBook",JSON.stringify(result))
        const rsLocal =JSON.parse(localStorage.getItem("searchBook"))
        state.search = rsLocal
       },
       addBooks: (state, action) => {
        state.books.push(action.payload)
       },
       deleteBooks: (state, action) => {
        state.books = state.books.filter((book) => book.id != action.payload )
       },
       getBooks: (state, action) => {
        state.books = action.payload
       },
     
       increase : (state, action) => {
        const rs = state.books
        rs.sort((a,b) => parseInt( a.price) - parseInt(b.price))
      
       },
       decrease : (state, action) => {
        const rs = state.books
        rs.sort((a,b) =>parseInt(b.price) - parseInt(a.price))
       
       }
    }
})
export const { searchBook, getBooks, increase, decrease, addBooks, deleteBooks } = booksSlice.actions;
export const selectBooks = (state : RootState) => state.books.books
export const selectSearch = (state : RootState) => state.books.search
export const selectSortPrice = (state : RootState) => state.books.sort
export default booksSlice.reducer;