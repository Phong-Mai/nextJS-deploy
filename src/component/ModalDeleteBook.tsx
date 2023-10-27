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
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { deleteBooks } from '@/redux/features/booksSlice';
interface IProps {
    showModal: boolean;
    setShowModal: (value : boolean) => void
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
export default function ModalDeleteBook({id} : any) {
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState<string>('');
    const [isPassword, setIsPassword] = useState<boolean>(false)
    const dispatch = useDispatch()
    const handleSubmit =async () => {
        // if(!password) {
        //   setIsPassword(true)
        //     return
        // }
        try {
          await axios.delete(`https://bixso-book-mgmt-web.onrender.com/api/v1/book/${id}`)
          dispatch(deleteBooks(id))
          handleCloseModal()
          toast.success("Delete Success")
        } catch (error) {
          toast.error("fail")
        }
    }
    const handleCloseModal = () => {
        setPassword('')
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const handleInput = (e: any) => {
      setPassword(e.target.value)
      setIsPassword(false)
    }

  return (
    <div>
        <Button color='error' onClick={handleOpen}> <DeleteIcon color='error' fontSize='small'/>&nbsp;Delete</Button>
      <Modal
        open={open}
        onClose={()=> handleCloseModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box  sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width : {md: 400, xs:'90%'},
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          }}>
          <Typography fontSize={30} id="modal-modal-title" variant="h6" color='error' component="h2">
            Delete New A Blog
          </Typography>
          <Box component='form'  style={{display:'flex', flexDirection:'column'}}>
          <Typography py={2}>
          Confirm Password
          </Typography>
          <TextField type='password' onChange={handleInput} required id="outlined-basic" label="Password" variant="outlined" />
          {isPassword && <Typography py={1} color='red'>Please enter a password</Typography>}
            <div style={{alignSelf:'flex-end'}}>
            <Button onClick={()=> handleCloseModal()} color='success'  style={{marginRight:5}}>Cancel</Button>
            <Button onClick={handleSubmit} color='error'  style={{textAlign:'right'}}>Agree</Button>
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}