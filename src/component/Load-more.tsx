"use client"

import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { fetchAPI } from '@/actions/fetchAPI'
import ListBook from './ListBook'

import Spinner from './Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { getBooks, selectBooks } from '@/redux/features/booksSlice'
const LoadMore = () => {

    const dispatch = useDispatch()
    const [books, setBooks] = useState<any>([]);
    const [loading, setLoading] = useState(false)
    const [pagesLoaded, setPagesLoaded] = useState(0);
    const { ref, inView } = useInView();

    const loadMoreBooks = async () => {
        const nextPage = pagesLoaded + 1;
        const newProducts = await fetchAPI(nextPage) ?? [];
        setBooks((prevProducts : any) => [...prevProducts, ...newProducts])
        dispatch(getBooks(books))
        setPagesLoaded(nextPage);
    }
    useEffect(() => {
        if(inView) {
            console.log("scrolled to the end");
            loadMoreBooks()
            setLoading(true)
        } 
      const timer =  setTimeout(() =>{
                setLoading(false)
        },1000)
        return () => clearTimeout(timer)
    },[inView])
  return (
    <>
    <ListBook/>
    <div ref={ref}>
        {loading && <Spinner/>}
    </div>
    </>
  )
}

export default LoadMore
