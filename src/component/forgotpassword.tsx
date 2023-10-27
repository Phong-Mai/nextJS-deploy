'use client'
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import { basicSchema } from '@/schemas';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ModalOtp from './ModalOtp';
import { toast } from 'react-toastify';
import logo from "@/pic/logo.jpg"
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
  display: 'flex',
  flexDirection: ' column',
  alignItems: 'center'

};
// interface typeValue = {
//   username: string;
//   email: string
// }
export default function ForgotPassword() {
  const router = useRouter();
  const [openOTP, setOpenOTP] = useState(false)
  const { values, errors, touched, handleBlur, handleChange }: any = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: basicSchema,
    onSubmit: () => {

    }
  });
  const handleSubmit = async () => {
    const { email } = values
    setOpenOTP(true)
    try {
      const rs = await axios.post("https://hiepdt2909.pythonanywhere.com/api/v1/forget-password", email)
      console.log("rs", rs);
      toast.success("OK")
    
    } catch (error) {
      toast.error("Email does not exist")
    }
  }
  return (
    <div>
      <Box sx={style}>
        <Image height={350} alt='logo' src={logo} />
        <Typography sx={{ color: 'yellowgreen', paddingTop: 1 }} variant="h4" component="h1">
          Forgot Password
        </Typography>
        <TextField type='email' size='small' onBlur={handleBlur} onChange={handleChange} sx={{ my: 1, width: '80%' }} id="outlined-basic" label="Email" name='email' value={values.email} variant="outlined" />
        {errors.email && touched.email && <p style={{ color: 'red', fontSize: 13, margin: 0 }}>{errors.email}</p>}
        <Button onClick={handleSubmit} sx={{ marginBottom: 1, width: '80%' }} variant="outlined">SEND</Button>
        <Button onClick={() => router.push('/')} sx={{ marginBottom: 1, width: '80%' }} variant="outlined">Sign In</Button>
        <Button onClick={() => router.push('/signup')} sx={{ marginBottom: 1, width: '80%' }} variant="outlined">Send Up</Button>
      </Box>
      <ModalOtp
        email={values.email}
        openOTP={openOTP}
        setOpenOTP={setOpenOTP}
      />
    </div>
  );
}