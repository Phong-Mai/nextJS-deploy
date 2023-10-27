'use client'
import  React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import { basicSchema } from '@/schemas';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
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
export default function SignUp() {
  const router = useRouter();
  const {values,errors, touched ,handleBlur,  handleChange}: any= useFormik({
    initialValues: {
        username: "",
        email:  "",
        password: "",
    },
    validationSchema: basicSchema,
    onSubmit:() => {

    }
  });
  const handleSubmit =async () => {
    if(Object.values(errors).length > 0) {return}
    const {email, username, password} = values
    console.log(JSON.stringify({email, username, password}));
    try {
      await axios.post("https://bixso-book-mgmt-web.onrender.com/api/v1/register",values)
      console.log("OK");  
      router.push('/')
      toast.success("Đăng ký thành công")
    } catch (error) {
      console.log("thử", error);
      toast.error("Thất bại")
    }
  }
  return (
    <div>
        <Box sx={style}>
           <img height={350} alt='logo' width='100%' src='https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/387137289_122125665332033075_4833314601378122701_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ZJuUof9_DdcAX-d6wK1&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfCdsF8A7vIYXljWFsiq2cXneHLs4hZQhvQUpOYck1aTxw&oe=652EAF54'/>
            <Typography sx={{color:'yellowgreen', paddingTop:1}} variant="h4" component="h1">
            Sign Up
          </Typography>
          <TextField  type='text' size='small' onBlur={handleBlur} onChange={handleChange} sx={{my:1, width:'80%'}} id="outlined-basic" label="Username" name='username' value={values.username} variant="outlined" />
          {errors.username && touched.username && <p style={{color:'red', fontSize:13, margin:0}}>{errors.username}</p>}
          <TextField type='email' size='small' onBlur={handleBlur} onChange={handleChange} sx={{my:1, width:'80%'}} id="outlined-basic" label="Email" name='email' value={values.email} variant="outlined" />
          {errors.email && touched.email && <p style={{color:'red', fontSize:13, margin:0}}>{errors.email}</p>}
          <TextField type='password' size='small' onBlur={handleBlur} onChange={handleChange} sx={{my:1, width:'80%'}} id="outlined-basic" label="Password" name='password' value={values.password} variant="outlined" />
          {errors.password && touched.password && <p style={{color:'red', fontSize:13, margin:0}}>{errors.password}</p>}
          {/* <TextField type='password'  size='small' onBlur={handleBlur} onChange={handleChange} sx={{my:1, width:'80%'}} id="outlined-basic" label="Confirm Password" name='confirmpassword' value={values.confirmpassword} variant="outlined" />
          {errors.confirmpassword && touched.confirmpassword && <p style={{color:'red', fontSize:13, margin:0}}>{errors.confirmpassword}</p>} */}
         <Button  onClick={() => router.push('/')} sx={{my:1,width:'80%'}} variant="outlined">Sign In</Button>
         <Button onClick={handleSubmit} sx={{marginBottom:1,width:'80%'}} variant="outlined">Sign Up</Button>
        </Box>

    </div>
  );
}