'use client'
import BasicModal from '@/component/login'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react'
import { useSelector } from 'react-redux'


export default function Home() {
  const router = useRouter()
  const sesstion = useSession()
  useEffect(() => {
    const remove = () => {
      localStorage.removeItem("searchBook");
  
    }
    return () => remove()
  },[])
  return (
  <div >
    <BasicModal/>
  </div>
  )
}
