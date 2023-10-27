'use client';
import { getLocalBook, setLocalBook } from '@/services/localstroge';
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

// export interface CounterState = {
//     value : number
// }

const initialState : any = {
    counter : null || []
} 

export const counterSlice: any = createSlice({
    name: "counter",
    initialState,
    reducers :{
        addBook: (state : RootState, action) => {
            setLocalBook(action.payload)
            state.counter = action.payload
            
        },
        getBook : (state : RootState) => {
            state.counter = JSON.parse(getLocalBook("book"))
        }
    }
})
export const { addBook, getBook } = counterSlice.actions;
export const selectValue = (state : RootState) => state.counter.counter
export default counterSlice.reducer;