'use client'
import  React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import axios from 'axios'
import { useRouter } from 'next/navigation';
interface IProps {
    showModal: boolean;
    setShowModal: (value : boolean) => void
}

export default function ModalOtp({openOTP, setOpenOTP, email}: any) {
    const [otp , setOtp] = useState("")
    const router = useRouter()
    const handleSubmit =async () => {
        if(!otp) {
            toast.error("Not empty OTP");
            return
        }
        try {
            const rs = await axios.post("https://bixso-book-mgmt-web.onrender.com/api/v1/verify", {otp, email})
            if(rs.data) {
                router.push('/signin')
            }
          handleCloseModal()
          toast.success("Success")
        } catch (error) {
          toast.error('fail')
        }
      
    }
    const handleCloseModal = () => {
        setOtp('')
        setOpenOTP(false)
    }
  return (
    <div>
      <Modal
        open={openOTP}
        onClose={()=> handleCloseModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box  sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width : {md: 300, xs:'40%'},
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          }}>
          <Typography id="modal-modal-title" variant="h6" color='success' component="h2">
           ENTER OTP
          </Typography>
          <Box component='form'  style={{display:'flex', flexDirection:'column'}}>
            <TextField onChange={(e) => setOtp(e.target.value)} style={{marginBottom:15}} id="standard-basic" label="OTP"  />
            <Button color='success' onClick={handleSubmit} variant='contained' style={{textAlign:'right'}}>Send</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}