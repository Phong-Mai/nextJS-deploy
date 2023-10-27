'use client'
import  React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import { basicSchema } from '@/schemas';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react'
import UserCard from './userCard';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import logo from "@/pic/logo.jpg"
import { setUserLocal } from '@/services/localstroge';
import {  setUser } from '@/redux/features/userSlice';
import Image from 'next/image';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
    display:'flex',
    flexDirection: ' column',
   alignItems:'center'

};
// interface typeValue = {
//   username: string;
//   email: string
// }
export default function BasicModal() {
  const sesstion = useSession()
  console.log(sesstion.data?.user);
  
  const router = useRouter()
  const dispatch = useDispatch()
  const {values,errors, touched ,handleBlur,  handleChange}: any= useFormik({
    initialValues: {
        username: "",
        email:  "",
        password: "",
    },
    validationSchema: basicSchema,
    onSubmit:() => {}
  });
  const handleSubmit =async () => {
    if(Object.values(errors).length > 0) {return}
   try {
   const rs = await axios.post("https://bixso-book-mgmt-web.onrender.com/api/v1/login", {email: values.email, password: values.password})
  
    if(rs.data) {
      dispatch(setUser(rs.data.data))
      router.push('/home')
      toast.success('Login Success')
    }
   } catch (error) {
    toast.error("Login Fail")
   }
  }
  const handleSignGoogle =() => {
 
      signIn('google', {callbackUrl: 'https://next-js-deploy-gamma.vercel.app/'})

  }
  return (
    <div>
        <Box sx={style}>
           <Image height={300} alt='logo' src={logo}></Image>
           <Link style={{alignSelf:'flex-end', textDecoration:'none', marginTop:5, marginRight:5, color:'blueviolet'}} href='/forgotpassword'>Forgot password?</Link>
            <Typography sx={{color:'yellowgreen', paddingTop:1}} variant="h4" component="h1">
            Sign In
          </Typography>
          <TextField  type='text' size='small' onBlur={handleBlur} onChange={handleChange} sx={{my:1, width:'80%'}} id="outlined-basic" label="Username" name='username' value={values.username} variant="outlined" />
          {errors.username && touched.username && <p style={{color:'red', fontSize:13, margin:0}}>{errors.username}</p>}
          <TextField type='email' size='small' onBlur={handleBlur} onChange={handleChange} sx={{my:1, width:'80%'}} id="outlined-basic" label="Email" name='email' value={values.email} variant="outlined" />
          {errors.email && touched.email && <p style={{color:'red', fontSize:13, margin:0}}>{errors.email}</p>}
          <TextField type='password' size='small' onBlur={handleBlur} onChange={handleChange} sx={{my:1, width:'80%'}} id="outlined-basic" label="Password" name='password' value={values.password} variant="outlined" />
          {errors.password && touched.password && <p style={{color:'red', fontSize:13, margin:0}}>{errors.password}</p>}
         <Button onClick={handleSubmit}  sx={{my:1,width:'80%'}} variant="outlined">Sign In</Button>
         <Button onClick={() => router.push('/signup')} sx={{marginBottom:1,width:'80%'}} variant="outlined">Sign Up</Button>
        <Button onClick={handleSignGoogle} sx={{marginBottom:2,width:'80%'}} variant="outlined"><img width='20px' src='https://tse1.mm.bing.net/th?id=OIP.bQFWLjAk0JQta4ZayBBRwAHaHa&pid=Api&P=0&w=300&h=300'/>Sign In With Google</Button>
        </Box>
    </div>
  );
}