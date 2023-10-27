'use client'
import { fetchAPI } from '@/actions/fetchAPI'
import ListBook from '@/component/ListBook'
import LoadMore from '@/component/Load-more'

import { useRouter } from 'next/navigation'
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'

async function page() {
  // props api
  // const books = await fetchAPI(1)
  // booksTest={books}
  // eslint-disable-next-line react-hooks/rules-of-hooks
  
  // const books =await fetchAPI()
  // eslint-disable-next-line react-hooks/rules-of-hooks

  return (
    <div>
      <LoadMore/>
    </div>
  )
}

export default page
