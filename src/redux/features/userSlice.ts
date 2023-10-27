"use client"
import { getLocalBook, getUserLocal, setLocalBook, setUserLocal } from '@/services/localstroge';
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

const initialState : any = {
    user : null,
} 

export const userSlice: any = createSlice({
    name: "user",
    initialState,
    reducers :{
        setUser: (state : RootState, action) => {
            setUserLocal(action.payload)
            state.user = action.payload
        },
        addUser: (state : RootState, action) => {
            state.user = action.payload
        },
        userLogout : (state : RootState, action) => {
            state.user = null ;
            localStorage.removeItem("user")
        }
    }
})
export const { setUser, userLogout } = userSlice.actions;
export const selectUser = (state : any) => state.user.user
// export const loadingSuccess = (state : RootState) => state.user.isLoading
export default userSlice.reducer;