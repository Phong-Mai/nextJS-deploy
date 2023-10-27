'use client';
import { getLocalBook, getLocalSearch, setLocalBook } from '@/services/localstroge';
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
        state.search = action.payload
       },
       addBooks: (state, action) => {
        state.books.push(action.payload)
       },
       deleteBooks: (state, action) => {
        state.books = state.books.filter((book : any) => book.id != action.payload )
       },
       getBooks: (state, action) => {
        state.books = action.payload
       },
     
       increase : (state, action) => {
        const rs = state.books
        rs.sort((a : any,b : any) => parseInt( a.price) - parseInt(b.price))
      
       },
       decrease : (state, action) => {
        const rs = state.books
        rs.sort((a : any,b : any) =>parseInt(b.price) - parseInt(a.price))
       
       }
    }
})
export const { searchBook, getBooks, increase, decrease, addBooks, deleteBooks } = booksSlice.actions;
export const selectBooks = (state : any) => state.books.books
export const selectSearch = (state : any) => state.books.search
export const selectSortPrice = (state : any) => state.books.sort
export default booksSlice.reducer;