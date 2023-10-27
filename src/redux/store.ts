import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './features/counterSlice';
import booksReducer from './features/booksSlice'
import userReducer from "./features/userSlice";


export const store = configureStore({
    reducer: {
        counter: counterReducer,
        books : booksReducer,
        user: userReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;