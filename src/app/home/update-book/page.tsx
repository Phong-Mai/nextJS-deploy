/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import UserCard from '@/component/userCard';
import UserUpdateBook from '@/component/UserUpdateBook';
import { getBook, selectValue } from '@/redux/features/counterSlice';
import { RootState } from '@/redux/store';
import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';




const page = () => {
 
  return (
    <UserUpdateBook/>
  )
}

export default page
