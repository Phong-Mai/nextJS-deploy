/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import UserCard from '@/component/userCard';
import { getBook, selectValue } from '@/redux/features/counterSlice';
import { RootState } from '@/redux/store';
import { Container } from '@mui/system';
import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';




const page = () => {
 
  return (
  
        <UserCard/>
    
  
  )
}

export default page
